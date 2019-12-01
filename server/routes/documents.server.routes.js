const express = require('express');

const documents = require('../controllers/documents.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/')
  .get(authenticate(), documents.get);

router.route('/:documentId')
  .get(authenticate(), documents.getDocument);

router.route('/generate/:templateTypeId')
  .get(authenticate(), documents.generate);

module.exports = router;
