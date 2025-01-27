exports.mockAuthenticateJWT = (req, res, next) => {
    req.user = {
      id: 1, 
      username: "mockUser",
      user_type: "staff", 
    };
    next();
  };
  