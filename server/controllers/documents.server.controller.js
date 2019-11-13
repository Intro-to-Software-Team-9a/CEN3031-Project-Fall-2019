const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');
const mongooseUtils = require('../utils/mongoose');
const Template = require('../models/Template.model');
const Document = require('../models/Document.model');
const QuestionnaireResponse = require('../models/QuestionnaireResponse.model');
const TemplateRenderer = require('../render/templateRenderer');

async function get(req, res) {
  const profile = await Profile.findOne({ accountId: req.session.accountId }).exec();

  if (!profile) {
    return res.status(404).send({ message: errors.profile.NOT_FOUND });
  }

  const documents = await Document.find({ profileId: profile._id }).populate(['templateId']);
  return res.send({ documents });
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


/**
 * Generates a Document from a Template using the most recent QuestionnaireResponse for the user.
 */
async function generate(req, res) {
  if (!req.params.templateId) {
    res.status(400);
    return res.send({ message: errors.other.INVALID_INPUT });
  }

  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId).exec();
    const questionnaireResponse = await QuestionnaireResponse
      .findOne({ profileId: req.session.profileId })
      .sort({ createdAt: -1 })
      .exec();

    if (!template || !questionnaireResponse) {
      res.status(404);
      return res.send({ message: errors.other.INVALID_INPUT });
    }

    const data = JSON.parse(questionnaireResponse.serializedResult);

    Object.assign(data, {
      currentDay: formatDay(new Date().getDate()),
      currentMonth: monthNames[new Date().getMonth()],
      currentYear: new Date().getFullYear(),
    });

    const renderedDocument = TemplateRenderer.render(
      template.template,
      data,
    );

    const document = new Document({
      title: template.title,
      text: renderedDocument,
      profileId: req.session.profileId,
      templateId: template,
    });

    await document.save();
    return res.send({ document });
  } catch (error) {
    if (mongooseUtils.getErrorType(error) === mongooseUtils.ErrorTypes.DUPLICATE_KEY) {
      res.status(400);
      return res.send({ message: errors.accounts.ACCOUNT_ALREADY_EXISTS });
    }

    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  generate,
  get,
};
