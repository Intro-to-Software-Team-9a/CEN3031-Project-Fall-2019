const assert = require('assert');
const validation = require('../../utils/validation');
const QuestionTypes = require('../../utils/questionTypes');

describe('Validation Utils', () => {
  describe('isValidShortAnswer', () => {
    const getDefaultQuestion = () => ({
      title: 'Hello, World?',
      possibleResponses: [
        { label: 'yes', responseType: QuestionTypes.SHORT_ANSWER },
      ],
    });

    // global question
    let question;
    let errorStream;

    beforeEach(() => {
      question = getDefaultQuestion();
      errorStream = [];
    });

    it('should return true if all properties provided', () => {
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, true, JSON.stringify(errorStream));
    });

    it('should return false for falsy', () => {
      question = null;
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for missing title', () => {
      delete question.title;
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for missing possibleResponses', () => {
      delete question.possibleResponses;
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for wrong type possibleResponses', () => {
      question.possibleResponses = 'I am not an array';
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for empty possibleResponses', () => {
      question.possibleResponses = [];
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for too many possibleResponses', () => {
      question.possibleResponses = question.possibleResponses.concat(question.possibleResponses);
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for possibleResponse without a label', () => {
      delete question.possibleResponses[0].label;
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for possibleResponse with incorrect type', () => {
      question.possibleResponses[0].responseType = QuestionTypes.MUTLIPLE_CHOICE;
      const actual = validation.isValidShortAnswer(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });
  });

  describe('isValidMultipleChoice', () => {
    const getDefaultQuestion = () => ({
      title: 'Hello, World?',
      possibleResponses: [
        { value: 'Yes', label: 'yes', responseType: QuestionTypes.MUTLIPLE_CHOICE },
        { value: 'No', label: 'no', responseType: QuestionTypes.MUTLIPLE_CHOICE },
      ],
    });

    // global question
    let question;
    let errorStream;

    beforeEach(() => {
      question = getDefaultQuestion();
      errorStream = [];
    });

    it('should return true if all properties provided', () => {
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, true, JSON.stringify(errorStream, 0, 2));
    });

    it('should return false for falsy', () => {
      question = null;
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream, 0, 2));
    });

    it('should return false for missing title', () => {
      delete question.title;
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream, 0, 2));
    });

    it('should return false for missing possibleResponses', () => {
      delete question.possibleResponses;
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream, 0, 2));
    });

    it('should return false for wrong type possibleResponses', () => {
      question.possibleResponses = 'I am not an array';
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream, 0, 2));
    });

    it('should return false for empty possibleResponses', () => {
      question.possibleResponses = [];
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream, 0, 2));
    });

    it('should return false for possibleResponse without a label', () => {
      delete question.possibleResponses[1].label;
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream, 0, 2));
    });

    it('should return false for possibleResponse with incorrect type', () => {
      question.possibleResponses[0].responseType = QuestionTypes.SHORT_ANSWER;
      const actual = validation.isValidMultipleChoice(question, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream, 0, 2));
    });
  });

  describe('isSectionValid', () => {
    const getDefaultSection = () => ({
      startIndex: 0,
      title: 'My Section',
      isShownBeforeLogin: false,
    });

    // global question
    let section;
    let errorStream;

    beforeEach(() => {
      section = getDefaultSection();
      errorStream = [];
    });

    it('should return true for valid section', () => {
      const actual = validation.isSectionValid(section, errorStream);
      assert.equal(actual, true, JSON.stringify(errorStream));
    });

    it('should return false for section without startIndex', () => {
      delete section.startIndex;
      const actual = validation.isSectionValid(section, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for section without title', () => {
      delete section.title;
      const actual = validation.isSectionValid(section, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false for section without isShownBeforeLogin', () => {
      delete section.isShownBeforeLogin;
      const actual = validation.isSectionValid(section, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });
  });

  describe('areSectionsValid', () => {
    const getDefaultSections = () => ([
      {
        startIndex: 0,
        title: 'My Section',
        isShownBeforeLogin: false,
      },
      {
        startIndex: 4,
        title: 'My Section',
        isShownBeforeLogin: false,
      },
      {
        startIndex: 5,
        title: 'My Section',
        isShownBeforeLogin: false,
      },
    ]);

    const getDefaultQuestions = () => ([
      { title: 'q0' },
      { title: 'q1' },
      { title: 'q2' },
      { title: 'q3' },
      { title: 'q4' },
      { title: 'q5' },
    ]);

    // global question
    let sections;
    let questions;
    let errorStream;

    beforeEach(() => {
      sections = getDefaultSections();
      questions = getDefaultQuestions();
      errorStream = [];
    });

    it('should return true for valid sections', () => {
      const actual = validation.areSectionsValid(sections, questions, errorStream);
      assert.equal(actual, true, JSON.stringify(errorStream));
    });

    it('should return true if sections are out of order', () => {
      const actual = validation.areSectionsValid(sections.reverse(), questions, errorStream);
      assert.equal(actual, true, JSON.stringify(errorStream));
    });

    it('should return false if section starts after questions end', () => {
      questions.splice(0, 1); // remove a question
      const actual = validation.areSectionsValid(sections, questions, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false if sections overlap', () => {
      sections[1].startIndex = 0; // set second section to have same startindex
      const actual = validation.areSectionsValid(sections, questions, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false if section is invalid', () => {
      delete sections[1].title;
      const actual = validation.areSectionsValid(sections, questions, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });
  });

  describe('isValidQuestionnaire', () => {
    const getDefaultSections = () => ([
      {
        startIndex: 0,
        title: 'My Section',
        isShownBeforeLogin: false,
      },
    ]);

    const getDefaultQuestions = () => ([
      {
        title: 'Hello, World?',
        questionType: QuestionTypes.MUTLIPLE_CHOICE,
        possibleResponses: [
          { value: 'Yes', label: 'label1', responseType: QuestionTypes.MUTLIPLE_CHOICE },
          { value: 'No', label: 'label2', responseType: QuestionTypes.MUTLIPLE_CHOICE },
        ],
      },
      {
        title: 'Hello, World?',
        questionType: QuestionTypes.MUTLIPLE_CHOICE,
        possibleResponses: [
          { value: 'Yes', label: 'label3', responseType: QuestionTypes.MUTLIPLE_CHOICE },
          { value: 'No', label: 'label4', responseType: QuestionTypes.MUTLIPLE_CHOICE },
          { value: 'Maybe?', label: 'label5', responseType: QuestionTypes.MUTLIPLE_CHOICE },
        ],
      },
    ]);

    let questions;
    let sections;
    let errorStream;

    beforeEach(() => {
      questions = getDefaultQuestions();
      sections = getDefaultSections();
      errorStream = [];
    });

    it('should return true if given valid questionnaire', () => {
      const actual = validation.isValidQuestionnaire({ questions, sections }, errorStream);
      assert.equal(actual, true, JSON.stringify(errorStream));
    });

    it('should return false if question missing type', () => {
      delete questions[0].questionType;
      const actual = validation.isValidQuestionnaire({ questions, sections }, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false if question has duplicate label within same question', () => {
      questions[0].possibleResponses[1].label = questions[0].possibleResponses[0].label;
      const actual = validation.isValidQuestionnaire({ questions, sections }, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false if question has duplicate label within different question', () => {
      questions[1].possibleResponses[0].label = questions[0].possibleResponses[0].label;
      const actual = validation.isValidQuestionnaire({ questions, sections }, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return false if questionnaire has undefined questions', () => {
      const actual = validation.isValidQuestionnaire({ sections }, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });

    it('should return true if questionnaire has no questions', () => {
      const actual = validation.isValidQuestionnaire({ sections, questions: [] }, errorStream);
      assert.equal(actual, true, JSON.stringify(errorStream));
    });

    it('should return false if questionnaire has no sections', () => {
      const actual = validation.isValidQuestionnaire({ questions }, errorStream);
      assert.equal(actual, false, JSON.stringify(errorStream));
    });
  });
});
