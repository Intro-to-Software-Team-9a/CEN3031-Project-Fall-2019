const Document = require('../models/Document.model');
const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');
const Template = require('../models/Template.model')

async function get(req, res) {
  const profile = await Profile.findOne({ accountId: req.session.accountId }).exec();
  
  if (!profile) {
    return res.status(404).send({ message: errors.profile.NOT_FOUND });
  }

  const documents = await Document.find({ profileId: profile._id }).populate(['templateId']);
  return res.send({ documents });
}

module.exports = {
  get,
};
