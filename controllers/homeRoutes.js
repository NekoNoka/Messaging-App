const router = require("express").Router();
// const { User } = require("../models/index");
const withAuth = require("../utils/auth");
const s = require("../utils/session");

router.get("/", withAuth, async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
