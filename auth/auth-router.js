const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // add this library

const Users = require("../users/users-model.js");
const secrets = require("../config/secret");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  // you will now receive the token in insomnia
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // const the token
        res.status(200).json({ token }); // add the token
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(201).json({ removed: `user removed with ID of: ${id}` });
      } else {
        res
          .status(404)
          .json({ message: "could not find a user with the given ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user from DB" });
    });
});

function generateToken(user) {
  // this could be in separate file
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1d" // token expires in one day
  };
  // bring in the secret from the secrets file
  return jwt.sign(payload, secrets.jwtSecret, options); // token has 3 parts
}

module.exports = router;
