const s = require("./session");
module.exports = (req, res, next) => {
  if (req.session.sToken != s) return req.session.destroy(() => { res.redirect("/login") });
  if (!req.session.loggedIn) return res.redirect("/login");
  next();
};
