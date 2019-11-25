const Questionniare = require('../models/Questionnaire.model');
const QuestionnaireResponse = require('../models/QuestionnaireResponse.model');
const errors = require('../utils/errors');
const QuestionTypes = require('../utils/questionTypes');

function validateResponse(response, questionnaire) {
  const missingResponseLabels = [];
  questionnaire.questions.forEach(({ questionType, possibleResponses }) => {
    switch (questionType) {
      case QuestionTypes.MUTLIPLE_CHOICE:
        possibleResponses.forEach(({ label }) => {
          if (response[label] === undefined) {
            missingResponseLabels.push(label);
          }
        });
        break;
      case QuestionTypes.SHORT_ANSWER:
        possibleResponses.forEach(({ label }) => {
          if (response[label] === undefined) {
            missingResponseLabels.push(label);
          }
        });
        break;
      default:
    }
  });

  if (missingResponseLabels.length > 0) {
    return ({ isOk: false, missingResponseLabels });
  }
  return ({ isOk: true, missingResponseLabels: [] });
}


/**
 * Accepts req.params.questionnaireId
 * and req.body.questionnaireResponse.
 */
async function create(req, res) {
  if (!req.params.questionnaireId || !req.body.questionnaireResponse) {
    res.status(400);
    return res.send({ message: errors.other.INVALID_INPUT });
  }

  const questionnaire = await Questionniare.findById(req.params.questionnaireId).exec();
  const { isOk, missingResponseLabels } = validateResponse(
    req.body.questionnaireResponse, questionnaire,
  );

  if (!isOk) {
    res.status(400);
    return res.send({ message: errors.other.INVALID_INPUT, missingResponseLabels });
  }

  const response = new QuestionnaireResponse({
    questionnaireId: req.params.questionnaireId,
    serializedResult: JSON.stringify(req.body.questionnaireResponse),
    profileId: req.session.profileId,
  });

  await response.save();
  return res.send({ response });
}

async function getById(req, res) {
  try {
    if (!req.params.questionnaireId) {
      res.status(400);
      return res.send({ message: errors.other.INVALID_INPUT });
    }

    const questionnaireResponse = await QuestionnaireResponse.findById(req.params.questionnaireId).exec();

    if (!questionnaireResponse) {
      res.status(404);
      return res.send({ message: errors.questionnaireResponse.NOT_FOUND });
    }

    if (questionnaireResponse.profileId !== req.session.profileId) {
      res.status(403);
      return res.send({ message: errors.questionnaireResponse.PERMISSION_DENIED });
    }

    return res.send({ questionnaireResponse });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

async function getMostRecent(req, res) {
  try {
    const questionnaireResponse = await QuestionnaireResponse
      .findOne({ profileId: req.session.profileId })
      .sort({ createdAt: -1 })
      .exec();

    if (!questionnaireResponse) {
      res.status(404);
      return res.send({ message: errors.questionnaireResponse.NOT_FOUND });
    }

    return res.send({ questionnaireResponse });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}


module.exports = {
  create,
  getById,
  getMostRecent
};
