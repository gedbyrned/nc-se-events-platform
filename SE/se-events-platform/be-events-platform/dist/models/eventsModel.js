import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
export const getAllEvents = async () => {
    const query = 'SELECT * FROM events'; // Simple SELECT query to fetch all events
    try {
        const result = await pool.query(query);
        return result.rows; // Return the events data from the query result
    }
    catch (err) {
        console.error('Error fetching events:', err);
        throw new Error('Error fetching events from database');
    }
};
export const getEventById = async (eventId) => {
    const query = 'SELECT * FROM events WHERE event_id = $1'; // Parameterized query to prevent SQL injection
    try {
        const result = await pool.query(query, [eventId]); // Pass the eventId as a parameter
        return result.rows[0];
    }
    catch (err) {
        console.error('Error fetching event:', err);
        throw new Error('Error fetching event from database');
    }
};
