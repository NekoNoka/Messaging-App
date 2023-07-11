const router = require("express").Router();
const { User } = require("../models/index");
const withAuth = require("../utils/auth");
const s = require("../utils/session");

router.get("/", withAuth, async (req, res) => {
  try {
    const groupMembers = [
      {
        name: "Cecil",
        email: "clangba@yahoo.com",
        github: "",
        contribution: "Front End: Handlebars CSS",
      },
      {
        name: "Aden",
        email: "adeneldredrewards2@gmail.com",
        github: "",
        contribution: "Back End: Web Socket",
      },
      {
        name: "William",
        email: "william.marks87@gmail.com",
        github: "",
        contribution: "Back End: Routes",
      },
      {
        name: "Lilia",
        email: "hdez.lilia56@gmail.com",
        github: "",
        contribution: "Front End: Handlebars CSS",
      },
    ];
    res.render("homepage", {
      name: req.session.name,
      groupMembers
    });
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
