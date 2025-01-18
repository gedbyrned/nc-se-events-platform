const db = require("../db/connection");

// Check if the user is already signed up for an event
exports.getExistingSignup = async (event_id, user_id) => {
  const result = await db.query(
    `SELECT * FROM signups WHERE event_id = $1 AND user_id = $2`,
    [event_id, user_id]
  );
  return result.rows[0];
};

// Add a new signup for an event
exports.addSignup = async (event_id, user_id) => {
  const result = await db.query(
    `INSERT INTO signups (event_id, user_id) VALUES ($1, $2) RETURNING *`,
    [event_id, user_id]
  );
  return result.rows[0];
};


exports.getUserSignedUpEvents = (user_id) => {
  const query = `
    SELECT events.*
    FROM events
    JOIN signups ON events.event_id = signups.event_id
    WHERE signups.user_id = $1;
  `;
  return db.query(query, [user_id]).then((result) => result.rows);
};
