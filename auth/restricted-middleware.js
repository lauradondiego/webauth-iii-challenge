const jwt = require("jsonwebtoken");
const secrets = require("../config/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization; // get the auth from the headers
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      // "keep it secret, keep it safe" can place where secrets.jwtSecret (same thing)
      console.log("decodedToken", decodedToken);
      // decodedToken { username: 'Drake', iat: 1568842126, exp: 1568928526 }
      if (err) {
        // if token expired or is invalid
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        // this else is for if there's no error
        // token is goooood
        // maybe add the user to the req object
        req.user = { username: decodedToken.username };
        // we are assigning the token to req.user (logged in user)
        next(); // next means its middleware
      } // now go to user-router
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
    // this is the else for the token (when there is no token)
  }
};

// this restricts access to resources on our api
