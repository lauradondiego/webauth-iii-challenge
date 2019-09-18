// add this file

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "keep it secret, keep it safe"
};

// go require this in auth-router now
