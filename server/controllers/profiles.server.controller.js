const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

async function get(req, res) {
  const profile = await Profile.findById(req.session.profileId).exec();

  if (!profile) {
    return res.status(404).send({ message: errors.profile.NOT_FOUND });
  }

  return res.send({ profile });
}

module.exports = {
  get,
};
