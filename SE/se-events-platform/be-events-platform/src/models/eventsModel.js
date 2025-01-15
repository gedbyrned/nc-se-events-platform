const db = require("../db/connection");

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

module.exports = { getAllEvents, getEventById };
