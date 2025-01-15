import format from "pg-format";
import { Pool } from "pg";
const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "se_events_platform",
    password: "password",
    port: 9090,
});
const seed = async ({ usersData, eventsData, attendeesData }) => {
    try {
        // Drop tables if they exist
        await db.query(`DROP TABLE IF EXISTS attendees`);
        await db.query(`DROP TABLE IF EXISTS events`);
        await db.query(`DROP TABLE IF EXISTS users`);
        // Create users table
        await db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'staff')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create events table (if you're using DATE type for the date column)
        await db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        event_name VARCHAR(100) NOT NULL,
        description TEXT,
        location VARCHAR(255) NOT NULL,
        date DATE NOT NULL,  -- Changed to DATE type for storing only the date
        created_by INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Create attendees table
        await db.query(`
      CREATE TABLE attendees (
        attendee_id SERIAL PRIMARY KEY,
        event_id INT NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
        user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Insert users data
        await db.query(format("INSERT INTO users (username, password, email, role, created_at) VALUES %L", usersData.map(({ username, password, email, role, created_at }) => [
            username,
            password,
            email,
            role,
            created_at || new Date().toISOString(),
        ])));
        // Insert events data
        await db.query(format("INSERT INTO events (event_name, description, location, date, created_by) VALUES %L", eventsData.map(({ event_name, description, location, date, created_by }) => [
            event_name,
            description,
            location,
            date, // Ensure `date` is in "YYYY-MM-DD" format
            created_by,
        ])));
        // Insert attendees data
        await db.query(format("INSERT INTO attendees (event_id, user_id) VALUES %L", attendeesData.map(({ event_id, user_id }) => [event_id, user_id])));
        console.log("Database seeded successfully!");
    }
    catch (error) {
        console.error("Error seeding database", error);
    }
    finally {
        await db.end();
    }
};
export default seed;
