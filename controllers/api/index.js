const router = require("express").Router();
const userRoutes = require("./userRoutes");
const whoami = require("./whoAmI");

router.use("/users", userRoutes);
router.use("/whoami", whoami);

module.exports = router;
