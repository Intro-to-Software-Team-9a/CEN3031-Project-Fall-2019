const express = require('express');

const accounts = require('../controllers/accounts.server.controller.js');

const router = express.Router();

router.route('/login')
  .post(accounts.login);

router.route('/logout')
  .post(accounts.logout);

router.route('/create')
  .post(accounts.createAccount);


module.exports = router;
