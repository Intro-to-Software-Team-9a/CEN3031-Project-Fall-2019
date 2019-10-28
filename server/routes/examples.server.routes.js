const express = require('express');
const examples = require('../controllers/examples.server.controller.js');

const router = express.Router();

router.route('/')
  .get(examples.hello);

module.exports = router;
