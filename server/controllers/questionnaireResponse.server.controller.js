const Questionniare = require('../models/Questionnaire.model');
const QuestionniareResponse = require('../models/QuestionnaireResponse.model');
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
      case QuestionTypes.SHORT_ANSWER:
        possibleResponses.forEach(({ label }) => {
          if (response[label] === undefined) {
            missingResponseLabels.push(label);
          }
        });
    }
  });

  if (missingResponseLabels.length > 0) {
    return ({ isOk: false, missingResponseLabels, });
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
  const { isOk, missingResponseLabels } = validateResponse(req.body.questionnaireResponse, questionnaire);

  if (!isOk) {
    res.status(400);
    return res.send({ message: errors.other.INVALID_INPUT, missingResponseLabels });
  }

  const response = new QuestionniareResponse({
    questionnaireId: req.params.questionnaireId,
    serializedResult: JSON.stringify(req.body.questionnaireResponse),
    profileId: req.session.profileId,
  });

  await response.save();
  return res.send({ response });
}

module.exports = {
  create,
};
