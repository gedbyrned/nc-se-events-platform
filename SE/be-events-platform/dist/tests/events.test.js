
import app from '../app';
describe('GET /events', () => {
    test('should fetch all events from the database', async () => {
        const response = await request(app).get('/api/events');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Make sure the response is an array
        // Explicitly define the type for 'event'
        response.body.forEach((event) => {
            expect(event).toHaveProperty('event_name');
            expect(event).toHaveProperty('description');
            expect(event).toHaveProperty('location');
            expect(event).toHaveProperty('date');
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
describe('GET /events/:event_id', () => {
    test('should fetch the event with the specified event_id', async () => {
        const eventId = 1; // Replace with a valid event ID for your test database
        const response = await request(app).get(`/api/events/${eventId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('event_id', eventId);
        expect(response.body).toHaveProperty('event_name');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('location');
        expect(response.body).toHaveProperty('date');
    });
    test('404: should return an error if the event does not exist', async () => {
        const nonExistentEventId = 9999; // Replace with an ID that does not exist in your test database
        const response = await request(app).get(`/api/events/${nonExistentEventId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'Event not found');
    });
    test('400: should return an error if the event_id is invalid', async () => {
        const invalidEventId = 'invalid'; // Non-numeric ID
        const response = await request(app).get(`/api/events/${invalidEventId}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('msg', 'Invalid event ID');
    });
});
