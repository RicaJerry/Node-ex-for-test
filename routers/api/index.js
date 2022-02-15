const router = require('express').Router();

const ping = require('./ping');
const employee = require('./employee');

router.use('/ping', ping); // Make basic auth if we have auth
router.use('/employee', employee);

module.exports = router;