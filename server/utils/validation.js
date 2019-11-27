const QuestionTypes = require('./questionTypes');

/** Returns whether the question is a valid short answer question. */
function isValidShortAnswer(question) {
  if (!question) {
    return false;
  }

  if (!question.title) {
    return false;
  }

  if (!question.possibleResponses || !(question.possibleResponses instanceof Array)) {
    return false;
  }

  if (question.possibleResponses.length !== 1) {
    return false;
  }

  const possibleResponse = question.possibleResponses[0];
  if (!possibleResponse.responseType === QuestionTypes.SHORT_ANSWER) {
    return false;
  }

  if (!possibleResponse.label) {
    return false;
  }

  return true;
}


/** Returns whether the question is a valid multiple choice question. */
function isValidMultipleChoice(question) {
  if (!question) {
    return false;
  }

  if (!question.title) {
    return false;
  }

  if (!question.possibleResponses || !(question.possibleResponses instanceof Array)) {
    return false;
  }

  const { possibleResponses } = question;


  return possibleResponses.every((response) => {
    if (response.responseType !== QuestionTypes.MUTLIPLE_CHOICE) {
      return false;
    }

    if (!response.value || !response.label) {
      return false;
    }

    return true;
  });
}


/** Returns whether the questionnaire is valid to store in the database. */
function isValidQuestionnaire(questionnaire) {
  if (!questionnaire.questions || !(questionnaire.questions instanceof Array)) {
    return false;
  }

  // assert questions are valid individually
  for (const question of questionnaire.questions) {
    switch (question.questionType) {
      case QuestionTypes.MUTLIPLE_CHOICE:
        if (!isValidMultipleChoice(question)) return false;
        break;
      case QuestionTypes.SHORT_ANSWER:
        if (!isValidShortAnswer(question)) return false;
        break;
      default:
        return false;
    }
  }

  // assert no duplicate labels
  const allLabels = new Set();
  for (const question of questionnaire.questions) {
    for (const response of question.possibleResponses) {
      if (allLabels.has(response.label)) {
        return false;
      }

      allLabels.add(response.label);
    }
  }

  return true;
}

module.exports = {
  isValidQuestionnaire,
};
