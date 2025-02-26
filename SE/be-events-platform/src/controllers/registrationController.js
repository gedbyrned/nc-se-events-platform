const { addUser, isUsernameTaken } = require("../models/registrationModel");

exports.registerUser = async (req, res, next) => {
  const {
    username,
    password,
    email,
    user_type,
  } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    !user_type
  ) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    
    const usernameTaken = await isUsernameTaken(username);
    if (usernameTaken) {
      return res.status(409).send({ error: "Username already taken" });
    }

   
    const user = await addUser({
      username,
      password,
      email,
      user_type,
    });

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

exports.checkUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const usernameTaken = await isUsernameTaken(username);
    res.status(200).send({ usernameTaken });
  } catch (err) {
    next(err);
  }
};
