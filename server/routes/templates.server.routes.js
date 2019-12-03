const express = require('express');

const templates = require('../controllers/templates.server.controller.js');
const { authenticateAdmin } = require('../middleware/authenticate');

const router = express.Router();

router.route('/')
  .get(templates.get);

router.route('/add')
  .post(authenticateAdmin(), templates.add);

router.route('/generate-and-download/:templateTypeId/response/:responseId')
  .get(authenticateAdmin(), templates.generateAndDownload);

router.route('/update')
  .patch(authenticateAdmin(), templates.update);

router.route('/purchase')
  .post(templates.purchase);

module.exports = router;
