const express = require('express');

const accounts = require('../controllers/accounts.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/login')
  .post(accounts.login);

router.route('/logout')
  .post(accounts.logout);

router.route('/create')
  .post(accounts.createAccount);

router.route('/password')
  .post(accounts.changePassword);

router.route('/email')
  .post(accounts.changeEmail);

router.route('/delete')
  .delete(authenticate(), accounts.deleteAccount);


module.exports = router;
