const router = require("express").Router();
const { User } = require("../../models/index");
const bcrypt = require("bcrypt");

// create user route
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        name: req.body.username,
      },
    });
    if (!userData) {
      res.status(400).json({ message: "Incorrect user-name" });
      return;
    }
    const validatePassword = userData.checkPassword(
      req.body.password,
      userData.password
    );
    if (!validatePassword) {
      res.status(400).json("Incorrect password");
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      res.json({ user: userData, message: "You successfully logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logout route
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;
