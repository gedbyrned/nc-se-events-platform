const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/userModel");

const secretKey = process.env.JWT_SECRET || "yourSecretKey";

exports.authenticate = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user.user_id, username: user.username, user_type: user.user_type },
        secretKey,
        { expiresIn: "24h" }
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    next(err);
  }
};


exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; 
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(401); 
      }
      req.user = user; 
      console.log(user)
      next(); 
    });
  } else {
    res.sendStatus(401); 
  }
};

