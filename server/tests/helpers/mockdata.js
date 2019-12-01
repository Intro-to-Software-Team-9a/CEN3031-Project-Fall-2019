const QuestionTypes = require('../../utils/questionTypes');
const Plans = require('../../utils/plans');
const livingWillTemplate = require('./livingWillTemplate');

const Account = require('../../models/Account.model');
const Profile = require('../../models/Profile.model');
const Document = require('../../models/Document.model');
const Template = require('../../models/Template.model');
const TemplateType = require('../../models/TemplateType.model');
const Questionnaire = require('../../models/Questionnaire.model');
const QuestionnaireResponse = require('../../models/QuestionnaireResponse.model');

// mock data for testing purposes

module.exports = {
  account1: new Account({
    email: 'test@gmail.com',
    passwordHash: '$2b$10$tOKa531X/IaHZncPznfUYu3es/D9MeK.JqbFZ3UJ0TS/5OEX6mUXa',
  }),
  profile1: new Profile({
    name: 'Example User',
    role: {
      isUser: true,
      isAdmin: false,
    },
    plan: Plans.NO_PLAN,
    ownedTemplateTypes: [],
  }),
  document1: new Document({
    data: Buffer.from('Hello, my name is Example User'),
  }),
  document2: new Document({
    data: Buffer.from('This is another version of template1'),
  }),
  templateType1: new TemplateType({
    title: 'Introduction',
    fileName: 'intro.docx',
    priceInCents: 1000,
  }),
  template1: new Template({
    data: Buffer.from("afdskfjsa"),
  }),
  template2: new Template({
    data: Buffer.from("sdfasdf"),
  }),
  questionnaire1: new Questionnaire({
    sections: [
      {
        title: 'General Information',
        startIndex: 0,
        isShownBeforeLogin: true,
      },
      {
        title: 'Beneficiary Information',
        startIndex: 2,
        isShownBeforeLogin: false,
      },
      {
        title: 'Final Instructions',
        startIndex: 4,
        isShownBeforeLogin: false,
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
  }),
  questionnaireResponse1: new QuestionnaireResponse({
    serializedResult: JSON.stringify({
      name: 'Brian',
      quest: 'I seek the grail.',
      cats: true,
      dogs: false,
    }),
    profileId: 'id-1',
  }),
};
