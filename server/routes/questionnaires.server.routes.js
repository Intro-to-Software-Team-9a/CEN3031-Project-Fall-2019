const express = require('express');

const questionnaire = require('../controllers/questionnaires.server.controller.js');

const router = express.Router();

router.route('/:questionnaireId')
  .get(questionnaire.getById);

router.route('/')
  .get(questionnaire.getMostRecent)
  .post(questionnaire.create);

module.exports = router;
