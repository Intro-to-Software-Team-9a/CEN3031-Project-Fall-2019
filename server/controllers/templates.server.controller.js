const mongoose = require('mongoose');
const Template = require('../models/Template.model');
const TemplateType = require('../models/TemplateType.model');
const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

/** Returns a list of all current templates. */
async function get(req, res) {
  try {
    const templates = await TemplateType.find().exec();
    return res.send({ templates });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

/** Adds a template to the database. */
async function add(req, res) {
  if (!req.body || !req.body.fileName || !req.body.data) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  const templateType = new TemplateType();

  templateType.title = req.body.title;
  templateType.fileName = req.body.fileName;
  templateType.priceInCents = req.body.price;

  await templateType.save();

  const template = new Template();
  template.data = req.body.data;
  template.templateTypeId = templateType;
  await template.save();

  res.status(200);
  return res.send({ message: 'TEMPLATE_TYPE_CREATE' });
}

/** Updates a pre-existing template */
async function update(req, res) {
  if (!req.body.name) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  const templateTitle = req.body.name;

  let template = await Template.findOne({
    title: templateTitle,
  }).exec();

  let msg = 'TEMPLATE_UPDATE';

  if (!template) {
    template = new Template();
    template.title = req.body.name;
    msg = 'TEMPLATE_CREATE';
  }

  if (req.body.buffer) {
    template.fileName = req.body.fileName;
    template.buffer = req.body.buffer;
  }

  if (req.body.price) {
    template.priceInCents = req.body.price;
  }

  await template.save();

  res.status(200);
  return res.send({ message: msg });
}

/** Adds templates to the user's account. */
async function purchase(req, res) {
  if (!req.body || !req.body.templateTypeIds) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  // todo: check if templateids is an array
  const purchasedTemplates = await TemplateType.find({
    _id: {
      $in: req.body.templateTypeIds.map(
        (templateTypeId) => mongoose.Types.ObjectId(templateTypeId),
      ),
    },
  }).exec();

  const profile = await Profile.findOne({ accountId: req.session.accountId }).exec();

  const ownedTemplateTypes = profile.ownedTemplateTypes || [];
  for (const templateType of purchasedTemplates) {
    if (!ownedTemplateTypes.includes((t) => t._id === templateType._id)) {
      ownedTemplateTypes.push(templateType);
    }
  }

  profile.ownedTemplateTypes = ownedTemplateTypes;
  await profile.save();

  return res.send();
}

module.exports = {
  get,
  add,
  update,
  purchase,
};
