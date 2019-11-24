const QuestionTypes = require('../../utils/questionTypes');
const Plans = require('../../utils/plans');
const livingWillTemplate = require('./livingWillTemplate');

// mock data for testing purposes

module.exports = {
  account1: {
    email: 'test@gmail.com',
    passwordHash: '$2b$10$tOKa531X/IaHZncPznfUYu3es/D9MeK.JqbFZ3UJ0TS/5OEX6mUXa',
  },
  profile1: {
    name: 'Example User',
    role: {
      isUser: true,
      isAdmin: false,
    },
    plan: Plans.NO_PLAN,
    ownedTemplates: [],
  },
  document1: {
    text: 'Hello, my name is Example User',
  },
  document2: {
    text: 'This is another version of template1',
  },
  template1: {
    title: 'Introduction',
    template: 'Hello, my name is {{ name }}',
    priceInCents: 1000,
  },
  template2: {
    title: 'Living Will',
    template: livingWillTemplate,
    priceInCents: 2000,
  },
  questionnaire1: {
    sections: [
      {
        title: 'General Information',
        startIndex: 0,
      },
      {
        title: 'Beneficiary Information',
        startIndex: 2,
      },
      {
        title: 'Final Instructions',
        startIndex: 4,
      },
    ],
    questions: [
      {
        title: 'What is your name?',
        questionType: QuestionTypes.SHORT_ANSWER,
        possibleResponses: [
          { responseType: QuestionTypes.SHORT_ANSWER, label: 'name' },
        ],
      },
      {
        title: 'What is your address?',
        questionType: QuestionTypes.SHORT_ANSWER,
        possibleResponses: [
          { responseType: QuestionTypes.SHORT_ANSWER, label: 'address' },
        ],
      },
      {
        title: 'What is the name of your surrogate?',
        questionType: QuestionTypes.SHORT_ANSWER,
        possibleResponses: [
          { responseType: QuestionTypes.SHORT_ANSWER, label: 'surrogateName' },
        ],
      },
      {
        title: 'What is the address of your surrogate?',
        questionType: QuestionTypes.SHORT_ANSWER,
        possibleResponses: [
          { responseType: QuestionTypes.SHORT_ANSWER, label: 'surrogateAddress' },
        ],
      },
      {
        title: 'Do you wish to continue care if you have a terminal condition?',
        questionType: QuestionTypes.MUTLIPLE_CHOICE,
        possibleResponses: [
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'Yes', label: 'terminalCondition' },
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'No', label: 'noTerminalCondition' },
        ],
      },
      {
        title: 'Do you wish to continue care if you have a end-stage condition?',
        questionType: QuestionTypes.MUTLIPLE_CHOICE,
        possibleResponses: [
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'Yes', label: 'endStageCondition' },
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'No', label: 'noEndStageCondition' },
        ],
      },
      {
        title: 'Do you wish to continue care if you are in a persistent vegetative state?',
        questionType: QuestionTypes.MUTLIPLE_CHOICE,
        possibleResponses: [
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'Yes', label: 'vegetativeState' },
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'No', label: 'noVegetativeState' },
        ],
      },
      {
        title: 'Do you have any additional instructions if you are incapacitated?',
        questionType: QuestionTypes.SHORT_ANSWER,
        possibleResponses: [
          { responseType: QuestionTypes.SHORT_ANSWER, label: 'additionalInstructions' },
        ],
      },
    ],
  },
  questionnaireResponse1: {
    serializedResult: JSON.stringify({
      name: 'Brian',
      quest: 'I seek the grail.',
      cats: true,
      dogs: false,
    }),
  },
};
