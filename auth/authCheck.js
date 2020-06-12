const jwt = require("jsonwebtoken");

/**
 * Check token
 */
exports.checkToken = (req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Token." });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400).send({
      msg: "Token not provided.",
    });
  }
};
