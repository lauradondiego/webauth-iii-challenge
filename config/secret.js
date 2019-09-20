// add this file

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "keep it secret, keep it safe"
  // can name jwtSecret anything you want
  // this file keeps them private, instead of writing as a string directly in restriced-middleware
};

// go require this in auth-router now
