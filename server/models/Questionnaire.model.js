const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Stores a questionnaire and its corresponding questions.
 * These objects are immutable in the database because they are referenced
 * by QuestionnaireResponses.
 */

/**
 * Question types:
 * MUTLIPLE_CHOICE: [
 *   {
 *     responseType: QuestionTypes.MULTIPLE_CHOICE,
 *     value: 'display-text',
 *     label: 'label-for-templating'
 *   }
 * ]
 * SHORT_ANSWER: [
 *   {
 *     responseType: QuestionTypes.SHORT_ANSWER,
 *     value: undefined,
 *     label: 'label-for-templating'
 *   }
 * ]
 *
 */

const QuestionniareSchema = new Schema({
  sections: [{
    // title of the section
    // "Beneficiary Information"
    title: { type: String, required: true },

    // index of the first question in the section
    startIndex: { type: Number, required: true },
  }],
  questions: [{

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
