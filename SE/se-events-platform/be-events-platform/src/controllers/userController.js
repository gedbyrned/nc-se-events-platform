const { getUserByUsername } = require("../models/userModel");

exports.getProfile = async (req, res, next) => {
  const { username } = req.user; // username from JWT

  try {
    const user = await getUserByUsername(username);

    if (user) {
      // Return the user object including the password
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};
