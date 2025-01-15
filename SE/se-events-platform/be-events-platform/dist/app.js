import express from 'express';
import dotenv from 'dotenv';
import { getEvents, getEvent } from './controllers/eventsController.js';
dotenv.config();
// Initialize express app
const app = express();
// Middleware to parse JSON
app.use(express.json());
// Define routes
app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEvent);
// Catch-all for undefined routes
app.all('*', (req, res) => {
    res.status(404).send({ msg: "404: route not found" });
});
// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err); // Logs error details to the console
    res.status(500).send('Something went wrong!');
});
const { PORT = 9090 } = process.env;
// Start server
app.listen(9090, () => {
    console.log(`Listening on ${PORT}...`);
});
export default app;
