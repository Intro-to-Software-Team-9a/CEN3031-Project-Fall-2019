const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

async function get(req, res) {
  try {
    const profile = await Profile.findById(req.session.profileId).populate(['accountId']);

    if (!profile) {
      return res.status(404).send({ message: errors.profile.NOT_FOUND });
    }

    return res.send({ profile });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}


module.exports = {
  get,
};
