const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');
const Template = require('../models/Template.model');
const TemplateType = require('../models/TemplateType.model');
const Document = require('../models/Document.model');
const QuestionnaireResponse = require('../models/QuestionnaireResponse.model');
const Templating = require('../utils/templating');

async function get(req, res) {
  const profile = await Profile.findOne({ accountId: req.session.accountId }).exec();

  if (!profile) {
    return res.status(404).send({ message: errors.profile.NOT_FOUND });
  }

  const documents = await Document.find({ profileId: profile._id }).sort({ createdAt: 'desc' });
  return res.send({ documents });
}

async function getDocument(req, res) {
  const document = await Document.findById(req.params.documentId);
  return res.send({ document });
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// TODO: replace with moment.js
/** Formats day of month (e.g., 13, 31) into correct format '13th', '31st' */
function formatDay(day) {
  if (day % 10 === 1) return `${day}st`;
  if (day < 20 && day > 10) return `${day}th`;
  if (day % 10 === 2) return `${day}nd`;
  return `${day}rd`;
}

/* Generates a Document from a Template using the most recent QuestionnaireResponse for the user. */
async function generate(req, res) {
  if (!req.params.templateTypeId) {
    res.status(400);
    return res.send({ message: errors.other.MISSING_PARAMETER });
  }

  try {
    const template = await Template.findOne({ templateTypeId: req.params.templateTypeId });
    const templateType = await TemplateType.findOne({ _id: req.params.templateTypeId });

    if (!template || !templateType) {
      res.status(404);
      return res.send({ message: errors.other.NOT_FOUND });
    }

    const questionnaireResponse = await QuestionnaireResponse
      .findOne({ profileId: req.session.profileId })
      .sort({ createdAt: -1 })
      .exec();

    if (!questionnaireResponse) {
      res.status(500);
      return res.send({ message: errors.other.UNKNOWN });
    }

    const data = JSON.parse(questionnaireResponse.serializedResult);

    Object.assign(data, {
      currentDay: formatDay(new Date().getDate()),
      currentMonth: monthNames[new Date().getMonth()],
      currentYear: new Date().getFullYear(),
    }); 

    const document = await Templating.generateDocumentFromData(template, templateType, data);
    await document.save();

    return res.send({ document });
  } catch (e) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  generate,
  get,
  getDocument,
};
