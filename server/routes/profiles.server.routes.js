const express = require('express');

const profiles = require('../controllers/profiles.server.controller.js');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.route('/')
  .get(authenticate(), profiles.get);

router.route('/plan')
  .patch(authenticate(), profiles.changePlan);

router.route('/onboarding')
  .patch(authenticate(), profiles.updateOnboarding);

module.exports = router;
