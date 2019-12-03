const mongoose = require('mongoose');
const Template = require('../models/Template.model');
const TemplateType = require('../models/TemplateType.model');
const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');
const paypalLib = require('./paypalLib');
const QuestionnaireResponse = require('../models/QuestionnaireResponse.model');
const Templating = require('../utils/templating');
const { formatDay, monthNames } = require('../utils/format');

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
  if (!req.body.templateTypeId || (!req.body.title && !req.body.data && !req.body.price)) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  const templateType = await TemplateType.findById(req.body.templateTypeId).exec();

  if (!templateType) {
    res.status(400);
    return res.send({ message: errors.other.NOT_FOUND });
  }

  const msg = 'TEMPLATE_UPDATE';


  if (req.body.data) {
    const template = new Template();
    template.data = req.body.data;
    template.templateTypeId = templateType;
    await template.save();
  }

  if (req.body.price !== null || req.body.price !== undefined) {
    templateType.priceInCents = req.body.price;
  }

  if (req.body.title) {
    templateType.title = req.body.title;
  }

  await templateType.save();

  res.status(200);
  return res.send({ message: msg });
}

/** Adds templates to the user's account. */
async function purchase(req, res) {
  try {
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

    let total = 0;
    purchasedTemplates.forEach((x) => { total += x.priceInCents; });

    // PAYPAL
    const order = await paypalLib.getPaypalOrderById(req.body.orderID);
    if (order === null) {
      res.status(404);
      return res.send(404);
    }

    const priceInCents = 100 * parseFloat(order.result.purchase_units[0].amount.value) 

    // 5. Validate the transaction details are as expected
    if (priceInCents !== total) {
      res.status(400);
      return res.send({ message: { p1: priceInCents, p2: total } });
    }
    // 7. Return a successful response to the client
    res.status(200);

    const profile = await Profile.findOne({ accountId: req.session.accountId }).exec();
    const ownedTemplateTypes = profile.ownedTemplateTypes || [];
    for (const templateType of purchasedTemplates) {
      if (!ownedTemplateTypes.includes((t) => t._id === templateType._id)) {
        ownedTemplateTypes.push(templateType);
      }
    }

    profile.ownedTemplateTypes = ownedTemplateTypes;
    await profile.save();

    const ownedTemplates = profile.ownedTemplates || [];
    for (const template of purchasedTemplates) {
      if (!ownedTemplates.includes((t) => t._id === template._id)) {
        ownedTemplates.push(template);
      }
    }

    profile.ownedTemplates = ownedTemplates;
    await profile.save();

    return res.send();
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

/* Generates a Document from a Template using the most recent QuestionnaireResponse for the user. */
async function generateAndDownload(req, res) {
  if (!req.params.templateTypeId) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  try {
    const template = await Template
      .findOne({ templateTypeId: req.params.templateTypeId })
      .sort({ createdAt: -1 })
      .exec();
    const templateType = await TemplateType.findOne({ _id: req.params.templateTypeId });

    if (!template || !templateType) {
      res.status(404);
      return res.send({ message: errors.other.NOT_FOUND });
    }

    const questionnaireResponse = await QuestionnaireResponse
      .findById(req.params.responseId)
      .exec();

    if (!questionnaireResponse) {
      res.status(404);
      return res.send({ message: errors.other.UNKNOWN });
    }

    const data = JSON.parse(questionnaireResponse.serializedResult);

    Object.assign(data, {
      currentDay: formatDay(new Date().getDate()),
      currentMonth: monthNames[new Date().getMonth()],
      currentYear: new Date().getFullYear(),
    });

    const document = await Templating.generateDocumentFromData(
      template, templateType, data, req.session.profileId,
    );

    return res.send({ document });
  } catch (e) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  get,
  add,
  update,
  purchase,
  generateAndDownload,
};
