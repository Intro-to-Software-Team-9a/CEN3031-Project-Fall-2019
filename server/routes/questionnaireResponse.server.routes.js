const express = require('express');

const questionnaireResponse = require('../controllers/questionnaireResponse.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/:questionnaireId')
  .post(authenticate(), questionnaireResponse.create);

module.exports = router;
