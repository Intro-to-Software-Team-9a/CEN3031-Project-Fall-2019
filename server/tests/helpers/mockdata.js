const QuestionTypes = require('../../utils/questionTypes');

// mock data for testing purposes

module.exports = {
  account1: {
    email: 'test@gmail.com',
    passwordHash: '$2b$10$h.HlAnw2uILiT0eOmrx0q.qEahmLCTcRmsbAHIKFS/9/gD1xX7dfW',
  },
  profile1: {
    name: 'Example User',
    role: {
      isUser: true,
      isAdmin: false,
    },
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
  questionnaire1: {
    questions: [
      {
        title: 'What is your name?',
        questionType: QuestionTypes.SHORT_ANSWER,
        possibleResponses: [
          { responseType: QuestionTypes.SHORT_ANSWER, label: 'name' },
        ],
      },
      {
        title: 'What is your quest?',
        questionType: QuestionTypes.SHORT_ANSWER,
        possibleResponses: [
          { responseType: QuestionTypes.SHORT_ANSWER, label: 'quest' },
        ],
      },
      {
        title: 'Which do you prefer?',
        questionType: QuestionTypes.MUTLIPLE_CHOICE,
        possibleResponses: [
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'Cats', label: 'cats' },
          { responseType: QuestionTypes.MUTLIPLE_CHOICE, value: 'Dogs', label: 'dogs' },
        ],
      },
    ],
  },
};
