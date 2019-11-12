const express = require('express');

const pdf = require('../controllers/pdf.server.controller.js');

const router = express.Router();

router.route('/:templateId')
  .get(pdf.genPDF);

module.exports = router;
