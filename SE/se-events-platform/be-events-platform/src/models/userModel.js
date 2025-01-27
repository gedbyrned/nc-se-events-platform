const db = require("../db/connection");

exports.getUserByUsername = (username) => {
  const query = "SELECT * FROM users WHERE username = $1 OR email = $1;";
  return db.query(query, [username]).then((result) => result.rows[0]);
};

exports.updateUserTokens = async (userId, accessToken, refreshToken) => {
  const result = await db.query(
    `UPDATE users SET google_access_token = $1, google_refresh_token = $2 WHERE user_id = $3 RETURNING *`,
    [accessToken, refreshToken, userId]
  );
  return result.rows[0];
};

exports.getUserById = async (userId) => {
  const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);
  return result.rows[0];
};
