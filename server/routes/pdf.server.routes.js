const express = require('express');

const pdf = require('../controllers/pdf.server.controller.js');

const router = express.Router();

router.route('/')
  .post(pdf.genPDF);

router.route('/download')
  .post(pdf.genPDF);

router.route('/print')
  .post(pdf.genPDF);

module.exports = router;