import { Pool } from 'pg'; // pg Pool for database connection
// Database connection pool (Assuming this is how you're handling it)
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});
// Function to get a user by username or email
export const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1 OR email = $1;';
    try {
        const result = await db.query(query, [username]);
        // Return the first row, or null if no user found
        return result.rows.length > 0 ? result.rows[0] : null;
    }
    catch (err) {
        console.error('Error executing query', err);
        throw new Error('Error fetching user');
    }
};
