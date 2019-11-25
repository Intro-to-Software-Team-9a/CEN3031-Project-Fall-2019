/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const paypalVerification = require('../controllers/paypalVerification.server.controller.js');

router.route('/paypalVerification').post(paypalVerification.handleRequest);

module.exports = router;
