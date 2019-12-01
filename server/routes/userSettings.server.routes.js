const express = require('express');

const userInfo = require('../controllers/userSettings.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/')
  .get(authenticate(), userInfo.get);

module.exports = router;
