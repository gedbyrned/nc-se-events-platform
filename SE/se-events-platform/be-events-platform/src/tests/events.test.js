const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const jwt = require("jsonwebtoken");

// Middleware and mock setup
const { mockAuthenticateJWT } = require("./mockAuthenticateJWT");

// Mock secret key
const secretKey = process.env.JWT_SECRET || "yourSecretKey";

// Mock valid user tokens
const validStaffUser = { id: 1, username: "staffUser", user_type: "staff" };
const validRegularUser = { id: 2, username: "regularUser", user_type: "regular" };

// Generate mock tokens
const validStaffToken = jwt.sign(validStaffUser, secretKey, { expiresIn: "1h" });
const validRegularToken = jwt.sign(validRegularUser, secretKey, { expiresIn: "1h" });

afterAll(() => {
  return db.end();
});

// Mock the authenticateJWT middleware for testing
jest.mock("./mockAuthenticateJWT", () => ({
  authenticateJWT: jest.fn((req, res, next) => {
    if (process.env.NODE_ENV === "test") {
      return mockAuthenticateJWT(req, res, next); // Use mock middleware in test
    }
    next(); // Otherwise, default behaviour
  }),
}));

describe("GET /api/events", () => {
  test("200: responds with an array of events with correct properties", async () => {
    const response = await request(app)
      .get("/api/events")
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .expect(200);

    const events = response.body;

    expect(Array.isArray(events)).toBe(true);
    events.forEach((event) => {
      expect(event).toMatchObject({
        event_id: expect.any(Number),
        event_name: expect.any(String),
        description: expect.any(String),
        location: expect.any(String),
        start_time: expect.any(String), // ISO timestamp
        end_time: expect.any(String), // ISO timestamp
        time_zone: expect.any(String),
        created_by: expect.any(Number),
        created_at: expect.any(String), // ISO timestamp
      });
    });
  });

  test("404: route not found", async () => {
    const response = await request(app)
      .get("/api/nonexistent")
      .expect(404);

    expect(response.body.msg).toBe("404: route not found");
  });
});

describe("GET /api/events/:event_id", () => {
  test("200: responds with event data for valid event_id", async () => {
    const eventId = 1; // Ensure this ID exists in the test database

    const response = await request(app)
      .get(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .expect(200);

    const event = response.body;

    expect(event).toMatchObject({
      event_id: eventId,
      event_name: expect.any(String),
      description: expect.any(String),
      location: expect.any(String),
      start_time: expect.any(String), // ISO timestamp
      end_time: expect.any(String), // ISO timestamp
      time_zone: expect.any(String),
      created_by: expect.any(Number),
      created_at: expect.any(String), // ISO timestamp
    });
  });

  test("404: should return an error if the event does not exist", async () => {
    const nonExistentEventId = 9999;

    const response = await request(app)
      .get(`/api/events/${nonExistentEventId}`)
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .expect(404);

    expect(response.body.msg).toBe("Event not found");
  });

  test("400: should return an error if the event_id is invalid", async () => {
    const invalidEventId = "invalid";

    const response = await request(app)
      .get(`/api/events/${invalidEventId}`)
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .expect(400);

    expect(response.body.msg).toBe("Invalid event ID");
  });
});

describe("POST /api/events", () => {
  test("201: creates a new event for an authenticated staff user", async () => {
    const newEvent = {
      event_name: "Test Event",
      description: "A test event description",
      location: "Test location",
      start_time: "2025-01-21T10:00:00.000Z",
      end_time: "2025-01-21T12:00:00.000Z",
    };

    const response = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .send(newEvent)
      .expect(201);

    expect(response.body.event).toMatchObject({
      event_id: expect.any(Number),
      event_name: "Test Event",
      description: "A test event description",
      location: "Test location",
      start_time: expect.any(String),
      end_time: expect.any(String),
      created_by: validStaffUser.id, // Staff user ID
    });
  });

  test("401: denies access if no token is provided", async () => {
    const newEvent = {
      event_name: "Test Event",
      description: "A test event description",
      location: "Test location",
      start_time: "2025-01-21T10:00:00.000Z",
      end_time: "2025-01-21T12:00:00.000Z",
    };

    const response = await request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(401);

    expect(response.body.msg).toBe("Unauthorized");
  });

  test("400: returns an error for missing required fields", async () => {
    const incompleteEvent = { event_name: "Incomplete Event" };

    const response = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .send(incompleteEvent)
      .expect(400);

    expect(response.body.msg).toBe("Bad request: missing required fields");
  });
});

describe("PATCH /api/events/:event_id", () => {
  const eventId = 1; // Replace with a valid event ID in your test database

  test("200: updates an event for an authenticated staff user", async () => {
    const updatedEvent = { event_name: "Updated Event" };

    const response = await request(app)
      .patch(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .send(updatedEvent)
      .expect(200);

    expect(response.body.event).toMatchObject({
      event_id: eventId,
      event_name: "Updated Event",
    });
  });

  test("403: denies access for non-staff users", async () => {
    const updatedEvent = { event_name: "Updated Event" };

    const response = await request(app)
      .patch(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${validRegularToken}`) // Regular user token
      .send(updatedEvent)
      .expect(403);

    expect(response.body.msg).toBe("You must be a staff member to perform this action");
  });
});

describe("DELETE /api/events/:event_id", () => {
  const eventId = 1; // Replace with a valid event ID in your test database

  test("204: deletes an event for an authenticated staff user", async () => {
    await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${validStaffToken}`) // Staff token
      .expect(204);
  });

  test("403: denies access for non-staff users", async () => {
    const response = await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${validRegularToken}`) // Regular user token
      .expect(403);

    expect(response.body.msg).toBe("You must be a staff member to perform this action");
  });
});
