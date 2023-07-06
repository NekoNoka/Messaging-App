const router = require("express").Router();
const { User } = require("../../models/index");
const wss = require("../../ws-server");
const s = require("../../utils/session");

// create user route
router.post("/", async (req, res) => {
    const userData = await User.create({
      name: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      const user = userData.toJSON();
      req.session.name = user.name;
      req.session.loggedIn = true;
      req.session.sToken = s;
      let token = Math.floor(Math.random() * 100000);
      wss.tokens[token] = user;
      req.session.token = token;
      res.status(200).json(JSON.stringify(token));
    });
});

// login route
router.post("/login", async (req, res) => {
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
      const user = userData.toJSON();
      req.session.name = user.name;
      req.session.loggedIn = true;
      req.session.sToken = s;
      let token = Math.floor(Math.random() * 100000);
      wss.tokens[token] = user;
      req.session.token = token;
      // res.json({ user: userData, message: "You successfully logged in" });
      res.status(200).json(JSON.stringify(token));
    });
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
