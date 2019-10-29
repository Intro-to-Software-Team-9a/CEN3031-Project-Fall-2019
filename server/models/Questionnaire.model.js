const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Stores a questionnaire and its corresponding questions.
 */

const QuestionniareSchema = new Schema({
  questions: [{
    // questions must be assigned a unique id
    id: { type: String, required: true },

    // title of the question
    // "What is your name?"
    title: { type: String, required: true },

    // what type of responses there are (e.g., multiple choice, numeric)
    questionType: { type: String, required: true },

    // a list of the possible response options (and their labels for templating)
    possibleResponses: [{
      responseType: { type: String, required: true },
      value: String, // e.g,. text for a single multple-choice option
      label: String, // label for templating
    }],
  }],
}, { timestamps: true });

module.exports = mongoose.model('Questionnaire', QuestionniareSchema);
