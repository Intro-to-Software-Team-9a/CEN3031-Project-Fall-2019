const mongooseUtils = require('../utils/mongoose');
const Template = require('../models/Template.model');
const Document = require('../models/Document.model');
const TemplateRenderer = require('../render/templateRenderer');
const errors = require('../utils/errors');

/**
 * Generates a Document from a Template using the most recent QuestionnaireResponse for the user.
 */
async function generate(req, res) {
  if (!req.params.templateId) {
    res.status(400);
    return res.send({ message: errors.other.INVALID_INPUT })
  }

  try {
    const templateId = req.params.templateId;
    const template = await Template.findById(templateId).exec();

    // TODO: pull data from questionnaire
    const data = {
      name: 'Gary',
    };

    const renderedDocument = TemplateRenderer.render(template.template, data);

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
};
