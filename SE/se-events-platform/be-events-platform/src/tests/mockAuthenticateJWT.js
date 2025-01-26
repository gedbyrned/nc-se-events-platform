exports.mockAuthenticateJWT = (req, res, next) => {
    req.user = {
      id: 1, // Default mock user ID
      username: "mockUser",
      user_type: "staff", // Default to staff; adjust in tests as needed
    };
    next();
  };
  