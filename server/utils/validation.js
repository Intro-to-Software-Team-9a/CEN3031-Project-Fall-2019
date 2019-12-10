const QuestionTypes = require('./questionTypes');

/** Returns whether the question is a valid short answer question. */
function isValidShortAnswer(question, errorStream) {
  if (!question) {
    errorStream.push({ data: { question }, error: 'Question is undefined' });
    return false;
  }

  if (!question.title) {
    errorStream.push({ data: { question }, error: 'Question has no title' });
    return false;
  }

  if (!question.possibleResponses || !(question.possibleResponses instanceof Array)) {
    errorStream.push({ data: { question }, error: 'Question possibleResponses are undefined' });
    return false;
  }

  if (question.possibleResponses.length !== 1) {
    errorStream.push({ data: { question }, error: 'A short answer question should have 1 response' });
    return false;
  }

  const possibleResponse = question.possibleResponses[0];
  if (![QuestionTypes.SHORT_ANSWER, QuestionTypes.LONG_ANSWER]
    .includes(possibleResponse.responseType)
  ) {
    errorStream.push({ data: { question }, error: 'Response has invalid type' });
    return false;
  }

  if (!possibleResponse.label) {
    errorStream.push({ data: { question }, error: 'Response has no label' });
    return false;
  }

  return true;
}


/** Returns whether the question is a valid multiple choice question. */
function isValidMultipleChoice(question, errorStream) {
  if (!question) {
    errorStream.push({ data: { question }, error: 'Question is not defined' });
    return false;
  }

  if (!question.title) {
    errorStream.push({ data: { question }, error: 'Question has no title' });
    return false;
  }

  if (!question.possibleResponses || !(question.possibleResponses instanceof Array)) {
    errorStream.push({ data: { question }, error: 'Question possibleResponses are undefined' });
    return false;
  }

  if (question.possibleResponses.length === 0) {
    errorStream.push({ data: { question }, error: 'A multiple choice question should have at least 1 response' });
    return false;
  }

  const { possibleResponses } = question;


  return possibleResponses.every((response) => {
    if (response.responseType !== QuestionTypes.MUTLIPLE_CHOICE) {
      errorStream.push({ data: { question }, error: 'Response has invalid type' });
      return false;
    }

    if (!response.value || !response.label) {
      errorStream.push({ data: { question }, error: 'Response has no value and/or label' });
      return false;
    }

    return true;
  });
}

function isSectionValid(section, errorStream) {
  if (section.startIndex !== 0 && !section.startIndex) {
    errorStream.push({ data: { section }, error: 'Section has no startIndex' });
    return false;
  }

  if (!section.title) {
    errorStream.push({ data: { section }, error: 'Section has no title' });
    return false;
  }

  if (section.isShownBeforeLogin !== false && !section.isShownBeforeLogin) {
    errorStream.push({ data: { section }, error: 'Section has no `isShownBeforeLogin`' });
    return false;
  }

  return true;
}

function areSectionsValid(sections, questions, errorStream) {
  if (!sections || !questions) {
    errorStream.push({ data: { questions, sections }, error: 'Questionnaire has no sections and/or questions' });
    return false;
  }

  if (!sections.every((section) => isSectionValid(section, errorStream))) {
    return false;
  }

  const sortedSections = sections.slice();
  sortedSections.sort((s1, s2) => s1.startIndex - s2.startIndex);

  // first section must start at the beginning
  if (sortedSections[0].startIndex !== 0) {
    errorStream.push({ data: { sections }, error: 'A section must be at the beginning of the questionnaire' });
    return false;
  }

  // subsequent sections cannot overlap
  for (let i = 1; i < sortedSections.length; i += 1) {
    const currIndex = sortedSections[i].startIndex;
    const prevIndex = sortedSections[i - 1].startIndex;
    if (currIndex <= prevIndex) {
      errorStream.push({ data: { sections }, error: 'At least one section is empty' });
      return false;
    }
  }

  // section should not go over the end of the questions
  for (let i = 1; i < sortedSections.length; i += 1) {
    const currIndex = sortedSections[i].startIndex;
    if (currIndex >= questions.length) {
      errorStream.push({ data: { sections }, error: 'A section starts after the last question' });
      return false;
    }
  }

  return true;
}


/** Returns whether the questionnaire is valid to store in the database. */
function isValidQuestionnaire(questionnaire, errorStream) {
  if (!questionnaire.questions || !(questionnaire.questions instanceof Array)) {
    errorStream.push({ data: { questionnaire }, error: 'Questionnaire has no questions' });
    return false;
  }

  if (!areSectionsValid(questionnaire.sections, questionnaire.questions, errorStream)) {
    return false;
  }

  // assert questions are valid individually
  for (const question of questionnaire.questions) {
    switch (question.questionType) {
      case QuestionTypes.MUTLIPLE_CHOICE:
        if (!isValidMultipleChoice(question, errorStream)) {
          return false;
        }
        break;
      case QuestionTypes.SHORT_ANSWER:
      case QuestionTypes.LONG_ANSWER:
        if (!isValidShortAnswer(question, errorStream)) {
          return false;
        }
        break;
      default:
        errorStream.push({ data: { questionnaire }, error: 'Question has invalid type' });
        return false;
    }
  }

  // assert no duplicate labels
  const allLabels = new Set();
  for (const question of questionnaire.questions) {
    for (const response of question.possibleResponses) {
      if (allLabels.has(response.label)) {
        errorStream.push({ data: { questionnaire }, error: 'Questionnaire has duplicate labels' });
        return false;
      }

      allLabels.add(response.label);
    }
  }

  return true;
}

// ensures that each label has a response
function isVaildResponse(response, questionnaire) {
  const missingResponseLabels = [];
  questionnaire.questions.forEach(({ questionType, possibleResponses }) => {
    switch (questionType) {
      case QuestionTypes.MUTLIPLE_CHOICE:
        possibleResponses.forEach(({ label }) => {
          if (response[label] === undefined) {
            missingResponseLabels.push(label);
          }
        });
        break;
      case QuestionTypes.SHORT_ANSWER:
        possibleResponses.forEach(({ label }) => {
          if (response[label] === undefined) {
            missingResponseLabels.push(label);
          }
        });
        break;
      default:
    }
  });

  if (missingResponseLabels.length > 0) {
    return ({ isOk: false, missingResponseLabels });
  }
  return ({ isOk: true, missingResponseLabels: [] });
}

module.exports = {
  isValidMultipleChoice,
  isValidShortAnswer,
  isSectionValid,
  areSectionsValid,
  isValidQuestionnaire,
  isVaildResponse,
};
