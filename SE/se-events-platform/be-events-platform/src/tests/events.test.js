const request = require('supertest'); 
const app = require('../app');
const db = require('../db/connection');


afterAll(() => {
  return db.end();
});

describe("GET /api/events", () => {
  test("200: responds with an array of events with correct properties", () => {
    return request(app)
      .get('/api/events')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((event) => {
          expect(event).toMatchObject({
            event_id: expect.any(Number),
            event_name: expect.any(String),
            description: expect.any(String),
            location: expect.any(String),
            date: expect.any(String),
          });
        });
      });
  });

  test("404: route not found", () => {
    return request(app)
      .get("/api/nonsense")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: route not found");
      });
  });
});

describe("GET /api/events/:event_id", () => {
  test("200: responds with event data for valid event_id", () => {
    const eventId = 1;
    return request(app)
      .get(`/api/events/${eventId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          event_id: eventId,
          event_name: expect.any(String),
          description: expect.any(String),
          location: expect.any(String),
          date: expect.any(String),
        });
      });
  });

  test("404: should return an error if the event does not exist", () => {
    const nonExistentEventId = 9999;
    return request(app)
      .get(`/api/events/${nonExistentEventId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toHaveProperty('msg', 'Event not found');
      });
  });

  test("400: should return an error if the event_id is invalid", () => {
    const invalidEventId = 'invalid';
    return request(app)
      .get(`/api/events/${invalidEventId}`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty('msg', 'Invalid event ID');
      });
  });
});
