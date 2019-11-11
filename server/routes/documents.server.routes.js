const express = require('express');

const documents = require('../controllers/documents.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/generate/:templateId')
  .get(authenticate(), documents.generate);

module.exports = router;
