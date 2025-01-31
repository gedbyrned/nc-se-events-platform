const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const jwt = require("jsonwebtoken");

const seedTestEvent = async () => {
  const { rows } = await db.query(
    `
    INSERT INTO events
      (event_name, description, location, start_time, end_time, time_zone, created_by, created_at)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `,
    [
      "Test Event",
      "A sample event for testing",
      "Test Location",
      "2025-01-30T10:00:00.000Z",
      "2025-01-30T12:00:00.000Z",
      "UTC",
      1,
      new Date().toISOString(),
    ]
  );

  return rows[0];
};

let testEvent;

beforeEach(async () => {
  await db.query("DELETE FROM events;");
  testEvent = await seedTestEvent();
});

afterAll(async () => {
  await db.end();
});

const { mockAuthenticateJWT } = require("./mockAuthenticateJWT");
jest.mock("./mockAuthenticateJWT", () => ({
  authenticateJWT: jest.fn((req, res, next) => {
    if (process.env.NODE_ENV === "test") {
      return mockAuthenticateJWT(req, res, next);
    }
    next();
  }),
}));

const secretKey = process.env.JWT_SECRET || "yourSecretKey";

const validStaffUser = { id: 1, username: "staffUser", user_type: "staff" };
const validRegularUser = {
  id: 2,
  username: "regularUser",
  user_type: "regular",
};

const validStaffToken = jwt.sign(validStaffUser, secretKey, {
  expiresIn: "1h",
});
const validRegularToken = jwt.sign(validRegularUser, secretKey, {
  expiresIn: "1h",
});

describe("Event API Endpoints", () => {
  describe("GET /api/events", () => {
    test("200: responds with an array of events with correct properties", async () => {
      const response = await request(app)
        .get("/api/events")
        .set("Authorization", `Bearer ${validStaffToken}`)
        .expect(200);

      const events = response.body;

      expect(Array.isArray(events)).toBe(true);
      events.forEach((event) => {
        expect(event).toMatchObject({
          event_id: expect.any(Number),
          event_name: expect.any(String),
          description: expect.any(String),
          location: expect.any(String),
          start_time: expect.any(String),
          end_time: expect.any(String),
          time_zone: expect.any(String),
          created_by: expect.any(Number),
          created_at: expect.any(String),
        });
      });
    });

    test("404: route not found", async () => {
      const response = await request(app).get("/api/nonexistent").expect(404);

      expect(response.body.msg).toBe("404: route not found");
    });
  });

  describe("GET /api/events/:event_id", () => {
    test("200: responds with event data for valid event_id", async () => {
      const response = await request(app)
        .get(`/api/events/${testEvent.event_id}`)
        .set("Authorization", `Bearer ${validStaffToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        event_id: testEvent.event_id,
        event_name: "Test Event",
        description: "A sample event for testing",
        location: "Test Location",
        start_time: expect.any(String),
        end_time: expect.any(String),
        time_zone: "UTC",
        created_by: 1,
        created_at: expect.any(String),
      });
    });

    test("404: should return an error if the event does not exist", async () => {
      const response = await request(app)
        .get(`/api/events/9999`)
        .set("Authorization", `Bearer ${validStaffToken}`)
        .expect(404);

      expect(response.body.msg).toBe("Event not found");
    });

    test("400: should return an error if the event_id is invalid", async () => {
      const response = await request(app)
        .get(`/api/events/invalid`)
        .set("Authorization", `Bearer ${validStaffToken}`)
        .expect(400);

      expect(response.body.msg).toBe("Invalid event ID");
    });
  });

  describe("POST /api/events", () => {
    test("200: updates an event for an authenticated staff user", async () => {
      const updatedEvent = {
        event_name: "Updated Event",
        description: "Updated description",
        location: "Updated Location",
        start_time: "2025-02-01T10:00:00.000Z",
        end_time: "2025-02-01T12:00:00.000Z",
      };

      const response = await request(app)
        .patch(`/api/events/${testEvent.event_id}`)
        .set("Authorization", `Bearer ${validStaffToken}`)
        .send(updatedEvent)
        .expect(200);

      expect(response.body.event).toMatchObject({
        event_id: testEvent.event_id,
        event_name: "Updated Event",
      });
    });

    test("401: denies access if no token is provided", async () => {
      const response = await request(app)
        .post("/api/events")
        .send({})
        .expect(401);

      expect(response.body.msg).toBe(
        "Authorization header missing or malformed"
      );
    });

    test("400: returns an error for missing required fields", async () => {
      const response = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${validStaffToken}`)
        .send({ event_name: "Incomplete Event" })
        .expect(400);

      expect(response.body.msg).toBe("400: Bad Request");
    });
  });

  describe("PATCH /api/events/:event_id", () => {
    test("200: updates an event for an authenticated staff user", async () => {
      const updatedEvent = {
        event_name: "Updated Event",
        description: "Updated description",
        location: "Updated Location",
        start_time: "2025-02-01T10:00:00.000Z",
        end_time: "2025-02-01T12:00:00.000Z",
      };

      const response = await request(app)
        .patch(`/api/events/${testEvent.event_id}`)
        .set("Authorization", `Bearer ${validStaffToken}`)
        .send(updatedEvent);
      expect(response.status).toBe(200);
    });

    test("403: denies access for non-staff users", async () => {
      const response = await request(app)
        .patch(`/api/events/${testEvent.event_id}`)
        .set("Authorization", `Bearer ${validRegularToken}`)
        .send({ event_name: "Updated Event" })
        .expect(403);

      expect(response.body.msg).toBe(
        "You must be a staff member to perform this action"
      );
    });
  });

  describe("DELETE /api/events/:event_id", () => {
    test("204: deletes an event for an authenticated staff user", async () => {
      await request(app)
        .delete(`/api/events/${testEvent.event_id}`)
        .set("Authorization", `Bearer ${validStaffToken}`)
        .expect(204);
    });

    test("403: denies access for non-staff users", async () => {
      const response = await request(app)
        .delete(`/api/events/${testEvent.event_id}`)
        .set("Authorization", `Bearer ${validRegularToken}`)
        .expect(403);

      expect(response.body.msg).toBe(
        "You must be a staff member to perform this action"
      );
    });
  });
});
