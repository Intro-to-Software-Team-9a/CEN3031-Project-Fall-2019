const express = require('express');

const questionnaireResponse = require('../controllers/questionnaireResponse.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();


router.route('/')
  .get(authenticate(), questionnaireResponse.getAll);

router.route('/latest')
  .get(authenticate(), questionnaireResponse.getMostRecent);

router.route('/:questionnaireResponseId')
  .get(authenticate(), questionnaireResponse.getById);

router.route('/:questionnaireId')
  .post(authenticate(), questionnaireResponse.create);

module.exports = router;
