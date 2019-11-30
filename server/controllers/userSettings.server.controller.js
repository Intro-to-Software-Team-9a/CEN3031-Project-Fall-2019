const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

async function get(req, res) {
  try {
    const profile = await Profile.findById(req.session.profileId).populate(['accountId']);
    
    // sanitize the profile and account information
    const sanitzedProfile = { ...profile._doc };
    
    // only grab email address from the account
    sanitzedProfile.email = sanitzedProfile.accountId.email;

    // delete all other properties of the account to ensure no leaks
    delete sanitzedProfile.accountId;

    if (!profile) {
      return res.status(404).send({ message: errors.profile.NOT_FOUND });
    }

    return res.send({ profile: sanitzedProfile });
  } catch (error) {
    console.error(error);
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}


module.exports = {
  get,
};
