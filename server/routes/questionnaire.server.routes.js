const express = require('express');

const questionnaire = require('../controllers/questionnaire.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/:questionnaireId')
  .get(questionnaire.getById);

router.route('/')
  .get(questionnaire.getMostRecent);

module.exports = router;
