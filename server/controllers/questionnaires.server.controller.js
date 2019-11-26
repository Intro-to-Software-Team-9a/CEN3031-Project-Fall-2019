const Questionnaire = require('../models/Questionnaire.model');
const errors = require('../utils/errors');
const validation = require('../utils/validation');

async function getById(req, res) {
  if (!req.params.questionnaireId) {
    res.status(400);
    return res.send({ message: errors.other.INVALID_INPUT });
  }

  try {
    const questionnaire = await Questionnaire.findById(req.params.questionnaireId).exec();
    if (!questionnaire) {
      res.status(404);
      return res.send({ message: errors.other.NOT_FOUND })
    }

    return res.send({ questionnaire });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

async function getMostRecent(req, res) {
  try {
    const questionnaire = await Questionnaire.findOne().sort({ createdAt: -1 }).exec();
    return res.send({ questionnaire });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}


/**
 * Creates a new questionnaire in the database.
 * Parameters:
 *
 * req.body: {
 *  questionnaire: {
 *    questions: [
 *      {
 *        title: 'What is your name?',
 *        questionType: 'SHORT_ANSWER',
 *        possibleResponses: [
 *          { responseType: 'SHORT_ANSWER', label: 'name' }
 *        ]
 *      },
 *      ...
 *    ],
 *  },
 * },
 */
async function create(req, res) {
  try {
    const errorStream = [];
    if (!req.body.questionnaire
        || !validation.isValidQuestionnaire(req.body.questionnaire, errorStream)) {
      res.status(400);
      return res.send({ message: errors.other.INVALID_INPUT, errors: errorStream });
    }

    const questionnaire = new Questionnaire(req.body.questionnaire);
    await questionnaire.save();

    return res.send({ questionnaire });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  getById,
  getMostRecent,
  create,
};
