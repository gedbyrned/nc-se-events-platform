import pool from '../db/db';

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date TIMESTAMP NOT NULL,
      attendees TEXT[]
    );
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user' -- 'user' or 'staff'
    );
  `;
  await pool.query(query);
  console.log('Tables created');
};

createTables().catch((err) => {
  console.error(err);
});
