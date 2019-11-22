const express = require('express');

const templates = require('../controllers/templates.server.controller.js');

const router = express.Router();

router.route('/')
  .get(templates.get);

router.route('/add')
  .post(templates.add);

router.route('/update')
  .post(templates.update);

router.route('/purchase')
  .post(templates.purchase);

module.exports = router;
