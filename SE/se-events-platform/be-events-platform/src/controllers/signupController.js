const { getExistingSignup, addSignup } = require("../models/signupModel");

exports.signupForEvent = async (req, res, next) => {
  const { event_id } = req.body;
  const { user_type, id: user_id } = req.user; 
  
  try {
    if (user_type !== "user") {
      return res.status(403).send({ error: "Only regular users can sign up for events." });
    }

    const existingSignup = await getExistingSignup(event_id, user_id);
    if (existingSignup) {
      return res.status(409).send({ error: "User is already signed up for this event." });
    }

    const signup = await addSignup(event_id, user_id);
    res.status(201).send(signup);
  } catch (err) {
    next(err);
  }
};
