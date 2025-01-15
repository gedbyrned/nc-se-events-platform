const db = require("../db/connection");


exports.addUser = (user) => {
    const { username, password, email, user_type } = user;
        console.log(user)
    const query = `
      INSERT INTO users (username, password, email, user_type)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  
    return db
      .query(query, [
        username,
        password,
        email,
        user_type,
      ])
      .then((result) => result.rows[0])
      .catch((err) => {
        console.error("Error adding user:", err);
        throw new Error("Failed to add user");
      });
  };

  exports.isUsernameTaken = (username) => {
    const query = "SELECT 1 FROM users WHERE LOWER(username) = LOWER($1);";
  
    return db
      .query(query, [username])
      .then((result) => result.rowCount > 0)
      .catch((err) => {
        console.error("Error checking username:", err);
        throw new Error("Failed to check username");
      });
  };