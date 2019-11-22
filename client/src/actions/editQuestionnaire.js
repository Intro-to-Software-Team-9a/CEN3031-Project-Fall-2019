import uuid from 'uuid/v4';
import axios from 'axios';

import { getQuestionnaire } from './questionnaire';

export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const CHANGE_QUESTION_TYPE = 'CHANGE_QUESTION_TYPE';
export const REMOVE_RESPONSE = 'REMOVE_RESPONSE';
export const CHANGE_QUESTION_RESPONSE_LABEL = 'CHANGE_QUESTION_RESPONSE_LABEL';
export const CHANGE_QUESTION_RESPONSE_VALUE = 'CHANGE_QUESTION_RESPONSE_VALUE';
export const SWAP_RESPONSE = 'SWAP_RESPONSE';
export const SWAP_QUESTIONS = 'SWAP_QUESITONS';
export const SAVE_QUESTIONNAIRE_START = 'SAVE_QUESTIONNAIRE_START';
export const SAVE_QUESTIONNAIRE_SUCCESS = 'SAVE_QUESTIONNAIRE_SUCCESS';
export const SAVE_QUESTIONNAIRE_FAIL = 'SAVE_QUESTIONNAIRE_FAIL';
export const RESET_QUESTIONS = 'RESET_QUESTIONS';
export const CHANGE_QUESTION_TITLE = 'CHANGE_QUESTION_TITLE';
export const DELETE_QUESTION = 'DELETE_QUESTION';

function sanitizeResponse({ responseType, value, label }) {
  return ({
    responseType,
    value,
    label,
  });
}

function sanitizeQuestion({ title, questionType, possibleResponses }) {
  return ({
    title,
    questionType,
    possibleResponses: possibleResponses.map(sanitizeResponse),
  });
}

export function saveQuestionnaire(onSuccess) {
  return async (dispatch, getState) => {
    dispatch({ type: SAVE_QUESTIONNAIRE_START });
    const state = getState();
    
    const questionnaire = {
      questions: state.editQuestionnaire.questions.map(sanitizeQuestion),
    };

    try {
      const response = await axios.post('/api/questionnaire', { questionnaire });
      dispatch({ type: SAVE_QUESTIONNAIRE_SUCCESS });

      await dispatch(resetQuestions());

      if (!onSuccess) {
        return;
      }
      await onSuccess();
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: SAVE_QUESTIONNAIRE_FAIL, data: { message } });
    }
  };
}

export function resetQuestions() {
  return async (dispatch, getState) => {
    await dispatch(getQuestionnaire());
    const state = getState();
    const questions = state.questionnaire.questionnaire.questions.map(sanitizeQuestion);
    dispatch({
      type: RESET_QUESTIONS,
      data: { questions },
    });
  };
}

function genLabel(state) {
  const questions = state.editQuestionnaire.questions;
  const labels = questions.flatMap((question) => {
    return question.possibleResponses.map((response) => response.label);
  });

  let newLabel = 'MyLabel1';
  let i = 1;
  while (labels.includes(newLabel)) {
    i++;
    newLabel = `MyLabel${i}`;
  }
  return newLabel;
}

function defaultShortAnswer(state, question) {
  if (!question || !question.possibleResponses || question.possibleResponses.length === 0) {
    return [
      {
        _id: uuid(),
        responseType: 'SHORT_ANSWER',
        label: genLabel(state)
      }
    ];
  }

  return [
    {
      _id: uuid(),
      responseType: 'SHORT_ANSWER',
      label: question.possibleResponses[0].label,
    }
  ];
}

function defaultMultipleChoiceResponse(state) {
  return {
    _id: uuid(),
    responseType: 'MULTIPLE_CHOICE',
    label: genLabel(state),
    value: 'Option Name'
  };
}

function defaultMultipleChoice(state, question) {
  if (!question || !question.possibleResponses || question.possibleResponses.length === 0) {
    return [
      defaultMultipleChoiceResponse(state),
    ];
  }

  return question.possibleResponses.map((response) => (
    {
      _id: uuid(),
      responseType: 'MULTIPLE_CHOICE',
      label: response.label,
      value: 'Option Name'
    }
  ));

}
export function defaultQuestion(state) {
  return {
    _id: uuid(),
    title: 'New Question',
    questionType: 'SHORT_ANSWER',
    possibleResponses: defaultShortAnswer(state),
  };
};

export function addNewQuestion(afterIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const event = ({
      type: ADD_NEW_QUESTION,
      data: { afterIndex, question: defaultQuestion(state) },
    });
    dispatch(event);
  };
}

export function deleteQuestion(index) {
  const event = ({
    type: DELETE_QUESTION,
    data: { index },
  });
  return event;
}

export function changeQuestionType(index, newType) {
  return (dispatch, getState) => {
    const state = getState();
    const event = ({
      type: CHANGE_QUESTION_TYPE,
      data: { index, newType },
    });

    const question = state.editQuestionnaire.questions[index];

    // if no change
    if (newType === question.questionType) {
      return;
    }

    if (newType === 'MULTIPLE_CHOICE') {
      event.data.newResponses = defaultMultipleChoice(state, question);
    }
    if (newType === 'SHORT_ANSWER') {
      event.data.newResponses = defaultShortAnswer(state, question);
    }
    dispatch(event);
  };
}

export function changeQuestionTitle(index, newTitle) {
  const event = ({
    type: CHANGE_QUESTION_TITLE,
    data: { index, newTitle },
  });
  return event;
}

export function addResponse(questionIndex, responseIndex) {
  return (dispatch, getState) => {
    const state = getState();
    const event = ({
      type: ADD_RESPONSE,
      data: { questionIndex, responseIndex, response: defaultMultipleChoiceResponse(state) },
    });
    dispatch(event);
  };
}

export function removeResponse(questionIndex, responseIndex) {
  const event = ({
    type: REMOVE_RESPONSE,
    data: { questionIndex, responseIndex },
  });
  return event;
}


export function changeQuestionFieldLabel(questionIndex, responseIndex, label) {
  const event = ({
    type: CHANGE_QUESTION_RESPONSE_LABEL,
    data: { questionIndex, responseIndex, label },
  });
  return event;
}

export function changeQuestionFieldValue(questionIndex, responseIndex, value) {
  const event = ({
    type: CHANGE_QUESTION_RESPONSE_VALUE,
    data: { questionIndex, responseIndex, value },
  });
  return event;
}

export function swapResponseUp(questionIndex, responseIndex) {
  const event = ({
    type: SWAP_RESPONSE,
    data: { questionIndex, index1: responseIndex, index2: responseIndex - 1 },
  });
  return event;
}


export function swapResponseDown(questionIndex, responseIndex) {
  const event = ({
    type: SWAP_RESPONSE,
    data: { questionIndex, index1: responseIndex, index2: responseIndex + 1 },
  });
  return event;
}


export function swapQuestionUp(questionIndex) {
  const event = ({
    type: SWAP_QUESTIONS,
    data: { index1: questionIndex, index2: questionIndex - 1 },
  });
  return event;
}

export function swapQuestionDown(questionIndex) {
  const event = ({
    type: SWAP_QUESTIONS,
    data: { index1: questionIndex, index2: questionIndex + 1 },
  });
  return event;
}
