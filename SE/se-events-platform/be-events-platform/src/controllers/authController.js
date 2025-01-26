const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { getUserByUsername, updateUserTokens } = require("../models/userModel");

const secretKey = process.env.JWT_SECRET || "yourSecretKey";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:5431/api/google/callback";

// Create an OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  googleRedirectUri
);

// JWT Authentication
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
        return res.status(401).json({ msg: "Invalid or expired token" });
      }
      req.user = user;
      console.log("Authenticated user:", user);
      next();
    });
  } else {
    res.status(401).json({ msg: "Authorization header missing or malformed" });
  }
};
