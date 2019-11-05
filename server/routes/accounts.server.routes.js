const express = require('express');
const passport = require('passport');

const account = require('../controllers/accounts.server.controller.js');

const router = express.Router();

router.route('/login')
  .post(account.login);

router.route('/create')
  .post(account.createAccount);

module.exports = router;
