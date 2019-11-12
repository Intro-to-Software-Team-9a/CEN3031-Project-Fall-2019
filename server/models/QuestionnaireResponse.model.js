const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Stores a response to a questionnaire.
 */

const QuestionniareResponseSchema = new Schema({
  // ref of the questionnaire
  questionnaireId: { type: Schema.Types.ObjectId, ref: 'Questionnaire', required: true },

  profileId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },

  // serialized result of the response
  serializedResult: String,
}, { timestamps: true });

module.exports = mongoose.model('QuestionnaireResponse', QuestionniareResponseSchema);
