const express = require('express');

const profiles = require('../controllers/profiles.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/')
  .get(authenticate(), profiles.get);

module.exports = router;
