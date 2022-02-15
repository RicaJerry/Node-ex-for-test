const router = require('express').Router();
const { HEADERS } = require('../../constants');

router.head('/', async(req, res) => {
  res.set(HEADERS.PING, 'pong');
  res.end();
});

module.exports = router;