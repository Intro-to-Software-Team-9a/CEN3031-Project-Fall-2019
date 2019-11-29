const mongoose = require('mongoose');
const Template = require('../models/Template.model');
const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

/** Returns a list of all templates */
async function get(req, res) {
  try {
    const templates = await Template.find().exec();
    return res.send({ templates });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

/** Adds a template to the database. */
async function add(req, res) {
  if (!req.body || !req.body.fileName || !req.body.buffer) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  const templateTitle = req.body.fileName;

  let template = await Template.findOne({
    title: templateTitle,
  }).exec();

  let msg = 'TEMPLATE_UPDATE';

  if (!template) {
    template = new Template();
    template.title = req.body.name;
    msg = 'TEMPLATE_CREATE';
  }

  template.fileName = req.body.fileName;
  template.buffer = req.body.buffer;
  template.priceInCents = req.body.price;

  await template.save();

  res.status(200);
  return res.send({ message: msg });
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
  if (!req.body || !req.body.templateIds) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  // todo: check if templateids is an array

  const purchasedTemplates = await Template.find({
    _id: { $in: req.body.templateIds.map((templateId) => mongoose.Types.ObjectId(templateId)) },
  }).exec();

  const profile = await Profile.findOne({ accountId: req.session.accountId }).exec();

  const ownedTemplates = profile.ownedTemplates || [];
  for (const template of purchasedTemplates) {
    if (!ownedTemplates.includes((t) => t._id === template._id)) {
      ownedTemplates.push(template);
    }
  }

  profile.ownedTemplates = ownedTemplates;
  await profile.save();

  return res.send();
}

module.exports = {
  get,
  add,
  update,
  purchase,
};
