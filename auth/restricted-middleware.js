const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization; // get the auth from the headers
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // if token expired or is invalid
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        // token is goooood
        // maybe add the user to the req object
        req.user = { username: decodedToken.username };
        next();
      } // now go to user-router
    });
  } else {
    res.status(400).json({ message: " No credentials provided" });
  }
};
