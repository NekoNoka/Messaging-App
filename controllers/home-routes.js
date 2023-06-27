const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage');
});

// router.get("*", async () => {

//   res.render('channel', db.channelInfo);
// });

module.exports = router;
