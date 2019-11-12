const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

async function get(req, res) {
  try {
    const profile = await Profile.findById(req.session.profileId).exec();

    if (!profile) {
      return res.status(404).send({ message: errors.profile.NOT_FOUND });
    }

    return res.send({ profile });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

/** Helper to change plan */
async function changePlanCall(profileId, newPlan) {
  const profile = await Profile.findById(profileId).exec();

  if (!profile) {
    throw new Error(errors.profile.NOT_FOUND);
  }

  profile.plan = newPlan;
  await profile.save();

  return profile;
}

/** Change plan of the user */
async function changePlan(req, res) {
  const { profileId } = req.session;
  const newPlan = req.body.plan;

  try {
    const profile = await changePlanCall(profileId, newPlan);
    return res.send({ profile });
  } catch (error) {
    if (error.message === errors.profile.NOT_FOUND) {
      res.status(404);
      return res.send({ message: errors.profile.NOT_FOUND });
    }

    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  get,
  changePlan,
  changePlanCall,
};
