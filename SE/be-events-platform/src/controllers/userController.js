const { getUserByUsername } = require("../models/userModel");
const { getUserSignedUpEvents } = require("../models/signupModel");

exports.getProfile = async (req, res, next) => {
  const { username } = req.user;
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const events = await getUserSignedUpEvents(user.user_id);

    res.status(200).send({
      ...user,
      events,
    });
  } catch (err) {
    next(err);
  }
};
