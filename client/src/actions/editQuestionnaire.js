import uuid from 'uuid/v4';

export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const CHANGE_QUESTION_TYPE = 'CHANGE_QUESTION_TYPE';
export const REMOVE_RESPONSE = 'REMOVE_RESPONSE';

function defaultShortAnswer() {
  return [
    { _id: uuid(), responseType: 'SHORT_ANSWER', label: 'label1' }
  ];
}

function defaultMultipleChoiceResponse() {
  return { _id: uuid(), responseType: 'MULTIPLE_CHOICE', label: 'label', value: 'Response' };
}

function defaultMultipleChoice() {
  return [
    defaultMultipleChoiceResponse(),
    defaultMultipleChoiceResponse(),
  ];
}
export function defaultQuestion() {
  return {
    _id: uuid(),
    title: 'New Question',
    questionType: 'SHORT_ANSWER',
    possibleResponses: defaultShortAnswer(),
  };
};

export function addNewQuestion(afterIndex) {
  return ({
    type: ADD_NEW_QUESTION,
    data: { afterIndex, question: defaultQuestion() },
  });
}

export function changeQuestionType(index, newType) {
  const event = ({
    type: CHANGE_QUESTION_TYPE,
    data: { index, newType },
  });
  if (newType === 'MULTIPLE_CHOICE') { 
    event.data.newResponses = defaultMultipleChoice();
  }
  if (newType === 'SHORT_ANSWER') {
    event.data.newResponses = defaultShortAnswer();
  }
  return event;
}

export function addResponse(questionIndex, responseIndex) {
  const event = ({
    type: ADD_RESPONSE,
    data: { questionIndex, responseIndex, response: defaultMultipleChoiceResponse() },
  });
  return event;
}

export function removeResponse(questionIndex, responseIndex) {
  const event = ({
    type: REMOVE_RESPONSE,
    data: { questionIndex, responseIndex },
  });
  return event;
}
