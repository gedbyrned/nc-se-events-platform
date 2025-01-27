const db = require("../db/connection");

// Get all events
const getAllEvents = () => {
    const query = 'SELECT * FROM events'; 
    return db.query(query)
        .then((result) => {
            return result.rows; 
        })
        .catch((err) => {
            console.error('Error fetching events:', err);
            throw new Error('Error fetching events from database');
        });
};

// Get a single event by ID
const getEventById = (eventId) => {
    const query = 'SELECT * FROM events WHERE event_id = $1';
    return db.query(query, [eventId]) 
        .then((result) => {
            return result.rows[0];
        })
        .catch((err) => {
            console.error('Error fetching event:', err);
            throw new Error('Error fetching event from database');
        });
};

const addEvent = (event_name, description, location, start_time, end_time, created_by) => {
    return db.query(`
        INSERT INTO events (event_name, description, location, start_time, end_time, created_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [event_name, description, location, start_time, end_time, created_by])
    .then((result) => {
        return result.rows[0]
    }); 
};

const updateEvent = (event_id, event_name, description, location, start_time, end_time) => {
    return db.query(`
        UPDATE events
        SET event_name = COALESCE($2, event_name),
            description = COALESCE($3, description),
            location = COALESCE($4, location),
            start_time = COALESCE($5, start_time),
            end_time = COALESCE($6, end_time)
        WHERE event_id = $1
        RETURNING *
    `, [event_id, event_name, description, location, start_time, end_time])
    .then((result) => {
        return result.rows[0];
    });
};

const deleteEventById = (eventId) => {
    const query = 'DELETE FROM events WHERE event_id = $1';
    return db.query(query, [eventId])
        .then((result) => {
            return result.rowCount; 
        })
        .catch((err) => {
            console.error('Error deleting event:', err);
            throw new Error('Error deleting event from database');
        });
};



module.exports = { getAllEvents, getEventById, addEvent, updateEvent, deleteEventById};
