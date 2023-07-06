const router = require("express").Router();
const { User } = require("../models/index");
const withAuth = require("../utils/auth");
const s = require("../utils/session");

router.get("/", withAuth, async (req, res) => {
  try {
    res.render("homepage", {
      name: req.session.name,
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

router.get('/aboutUs', (req, res) =>{
  try {
    const groupMembers = [
      {
        name: 'Cecil',
        email: 'clangba@yahoo.com',
        github: '',
        contribution: ''

      },
      {
        name: 'Aden',
        email: 'adeneldredrewards2@gmail.com',
        github: '',
        contribution: ''

      },
      {
        name: 'Mark',
        email: 'william.marks87@gmail.com',
        github: '',
        contribution: ''

      },
      {
        name: 'Lilia',
        email: 'hdez.lilia56@gmail.com',
        github: '',
        contribution: ''

      },
      
    ]
    res.render("aboutUs", {
      groupMembers
    });

  } catch (err) {
    res.status(500).json(err);
  }
}
)


module.exports = router;
