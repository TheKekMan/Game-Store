const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify the token, if there is one
  try {
    jwt.verify(token, process.env.JWT_PRIVATE, (err, data) => {
      if (err) {
        console.log("ошибка верификации токена");
        return res.status(500).json({ message: "Failed to authenticate" });
      }
      req.user = { id: data.user };
      next();
    });
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
