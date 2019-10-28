const mongoose, { Schema } = require('mongoose');

/**
 * Stores a response to a questionnaire.
 */

const QuestionniareResponseSchema = new mongoose.Schema({
  // ref of the questionnaire
  questionnaireId: { type: Schema.Types.ObjectId, ref: 'Questionnaire', required: true },

  // each response corresponds to a question in the questionnaire
  questionResponses: [{
    // id of the corresponding questionnaire.question
    questionId: { type: String, required: true },

    // a list of responses depending on question type 
    responses: [{
      value: { type: String, required: true },
    }],
  }],
}, { timestamps: true });

export default mongoose.model('QuestionnaireResponse', QuestionniareResponseSchema);
