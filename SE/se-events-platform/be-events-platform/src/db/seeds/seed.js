const format = require("pg-format");
const db = require("../connection");

const seed = async ({
  usersData,
  eventsData,
  signupsData,
  userTypesData
}) => {
  try {
    await db.query(`DROP TABLE IF EXISTS signups CASCADE`);
    await db.query(`DROP TABLE IF EXISTS events CASCADE`);
    await db.query(`DROP TABLE IF EXISTS users CASCADE`);
    await db.query(`DROP TABLE IF EXISTS userTypes CASCADE`);

    await db.query(`
      CREATE TABLE userTypes (
        type VARCHAR(50) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        user_type VARCHAR(50) NOT NULL REFERENCES userTypes(type) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255) NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        time_zone VARCHAR(50) DEFAULT 'Europe/London',
        created_by INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE signups (
        signup_id SERIAL PRIMARY KEY,
        event_id INT NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
        user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const insertUserTypesQueryStr = format(
      "INSERT INTO userTypes (type) VALUES %L",
      userTypesData.map(({ type }) => [type])
    );
    await db.query(insertUserTypesQueryStr);

    const insertUsersQueryStr = format(
      "INSERT INTO users (username, password, email, user_type, created_at) VALUES %L",
      usersData.map(({ username, password, email, user_type, created_at }) => [
        username,
        password,
        email,
        user_type,
        created_at || new Date().toISOString()
      ])
    );
    await db.query(insertUsersQueryStr);

    const insertEventsQueryStr = format(
      `INSERT INTO events (event_name, description, location, start_time, end_time, time_zone, created_by) VALUES %L`,
      eventsData.map(
        ({
          event_name,
          description,
          location,
          start_time,
          end_time,
          time_zone,
          created_by
        }) => [
          event_name,
          description,
          location,
          start_time,
          end_time,
          time_zone || "Europe/London",
          created_by
        ]
      )
    );
    await db.query(insertEventsQueryStr);

    const insertSignupsQueryStr = format(
      "INSERT INTO signups (event_id, user_id, created_at) VALUES %L",
      signupsData.map(({ event_id, user_id, created_at }) => [
        event_id,
        user_id,
        created_at || new Date().toISOString()
      ])
    );
    await db.query(insertSignupsQueryStr);

    console.log('Seeding completed successfully.');
  } catch (err) {
    console.error('Error seeding database', err);
  }
};

module.exports = seed;
