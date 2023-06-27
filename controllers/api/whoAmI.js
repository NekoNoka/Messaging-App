const router = require("express").Router();
const User = require("../../models/User");

router.get("/whoami", (req, res) => {
  const userData = req.session;
  res.json(userData);
});

module.exports = router;
