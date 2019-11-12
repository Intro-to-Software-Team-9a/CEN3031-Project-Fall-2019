const Questionnaire = require('../models/Questionnaire.model');
const errors = require('../utils/errors');

async function getById(req, res) {
  if (!req.params.questionniareId) {
    res.status(400);
    return res.send({ message: errors.other.INVALID_INPUT });
  }

  try {
    const questionnaire = await Questionnaire.findById(req.params.questionniareId).exec();
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

module.exports = {
  getById,
  getMostRecent,
};
