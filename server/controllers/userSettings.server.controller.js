const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

async function get(req, res) {
  try {
    const profile = await Profile.findById(req.session.profileId)
      .populate(['accountId']);

    if (!profile) {
      res.status(404);
      return res.send({ message: errors.profile.NOT_FOUND });
    }

    // sanitize the profile and account information
    const sanitzedProfile = { ...profile._doc };

    // only grab email address from the account
    sanitzedProfile.email = sanitzedProfile.accountId.email;

    // delete all other properties of the account to ensure no leaks
    delete sanitzedProfile.accountId;

    return res.send({ profile: sanitzedProfile });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}


module.exports = {
  get,
};
