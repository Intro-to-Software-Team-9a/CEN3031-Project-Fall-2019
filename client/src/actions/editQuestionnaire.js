import uuid from 'uuid/v4';
import axios from 'axios';

import { getQuestionnaire } from './questionnaire';

export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const ADD_NEW_SECTION = 'ADD_NEW_SECTION';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const CHANGE_QUESTION_TYPE = 'CHANGE_QUESTION_TYPE';
export const CHANGE_QUESTION_TITLE = 'CHANGE_QUESTION_TITLE';
export const CHANGE_SECTION_TITLE = 'CHANGE_SECTION_TITLE';
export const CHANGE_SECTION_SHOWN = 'CHANGE_SECTION_SHOWN';
export const REMOVE_RESPONSE = 'REMOVE_RESPONSE';
export const CHANGE_QUESTION_RESPONSE_LABEL = 'CHANGE_QUESTION_RESPONSE_LABEL';
export const CHANGE_QUESTION_RESPONSE_VALUE = 'CHANGE_QUESTION_RESPONSE_VALUE';
export const SWAP_RESPONSE = 'SWAP_RESPONSE';
export const SWAP_QUESTIONS = 'SWAP_QUESITONS';
export const MOVE_SECTION = 'MOVE_SECTION';
export const SAVE_QUESTIONNAIRE_START = 'SAVE_QUESTIONNAIRE_START';
export const SAVE_QUESTIONNAIRE_SUCCESS = 'SAVE_QUESTIONNAIRE_SUCCESS';
export const SAVE_QUESTIONNAIRE_FAIL = 'SAVE_QUESTIONNAIRE_FAIL';
export const RESET_QUESTIONS = 'RESET_QUESTIONS';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_SECTION = 'DELETE_SECTION';


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

function sanitizeSection({ title, startIndex, isShownBeforeLogin }) {
  return ({ title, startIndex, isShownBeforeLogin });
}

export function resetQuestions() {
  return async (dispatch, getState) => {
    await dispatch(getQuestionnaire());
    const state = getState();
    const questions = state.questionnaire.questionnaire.questions
      .map((question) => ({
        ...question,
        possibleResponses: question.possibleResponses.map((response) => response._id),
      }));
    const responses = state.questionnaire.questionnaire.questions.flatMap(
      (question) => question.possibleResponses,
    );

    const { sections } = state.questionnaire.questionnaire;
    dispatch({
      type: RESET_QUESTIONS,
      data: { questions, sections, responses },
    });
  };
}

export function saveQuestionnaire(onSuccess) {
  return async (dispatch, getState) => {
    const state = getState();

    const { responses } = state.editQuestionnaire;

    const joinedQuestions = state.editQuestionnaire.questions.map(
      (question) => ({
        ...question,
        possibleResponses: question.possibleResponses.map(
          (responseId) => responses.find((r) => r._id === responseId),
        ),
      }),
    );
    const questionnaire = {
      questions: joinedQuestions.map(sanitizeQuestion),
      sections: state.editQuestionnaire.sections.map(sanitizeSection),
    };

    dispatch({ type: SAVE_QUESTIONNAIRE_START, data: { questionnaire } });

    try {
      await axios.post('/api/questionnaire', { questionnaire });
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

function genLabel(state) {
  const { responses } = state.editQuestionnaire;
  const labels = responses.map((response) => response.label);

  let newLabel = 'MyLabel1';
  let i = 1;
  while (labels.includes(newLabel)) {
    i += 1;
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
        label: genLabel(state),
      },
    ];
  }

  const { responses } = state.editQuestionnaire;
  const responseId = question.possibleResponses[0];

  return [
    {
      _id: uuid(),
      responseType: 'SHORT_ANSWER',
      label: responses.find((r) => r._id === responseId).label,
    },
  ];
}

function defaultMultipleChoiceResponse(state) {
  return {
    _id: uuid(),
    responseType: 'MULTIPLE_CHOICE',
    label: genLabel(state),
    value: 'Option Name',
  };
}

function defaultMultipleChoice(state, question) {
  if (!question || !question.possibleResponses || question.possibleResponses.length === 0) {
    return [
      defaultMultipleChoiceResponse(state),
    ];
  }

  const { responses } = state.editQuestionnaire;

  return question.possibleResponses.map((responseId) => {
    const response = responses.find((r) => r._id === responseId);
    return {
      _id: uuid(),
      responseType: 'MULTIPLE_CHOICE',
      label: response.label,
      value: 'Option Name',
    };
  });
}
export function defaultQuestion(state) {
  return {
    _id: uuid(),
    title: 'New Question',
    questionType: 'SHORT_ANSWER',
    possibleResponses: defaultShortAnswer(state),
  };
}

export function defaultSection(startIndex) {
  return {
    _id: uuid(),
    title: 'New Section',
    startIndex,
    isShownBeforeLogin: false,
  };
}

/** Adds a new question after the one at `afterIndex` */
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

/** Adds a new section after the question at `afterQuestionIndex` */
export function addNewSection(afterQuestionIndex) {
  const event = ({
    type: ADD_NEW_SECTION,
    data: { afterQuestionIndex, section: defaultSection(afterQuestionIndex) },
  });
  return event;
}

/** Deletes a question by index in the array of questions */
export function deleteQuestion(index) {
  const event = ({
    type: DELETE_QUESTION,
    data: { index },
  });
  return event;
}

/** Delete a section by `_id` in the array of sections */
export function deleteSection(sectionId) {
  const event = ({
    type: DELETE_SECTION,
    data: { sectionId },
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


export function changeSectionTitle(sectionId, newTitle) {
  const event = ({
    type: CHANGE_SECTION_TITLE,
    data: { sectionId, newTitle },
  });
  return event;
}

export function changeSectionShown(sectionId, newValue) {
  const event = ({
    type: CHANGE_SECTION_SHOWN,
    data: { sectionId, newValue },
  });
  return event;
}

/** Moves the start of section with the specified
 *  id by `distance` (can be negative)
 */
export function moveSection(sectionId, distance) {
  const event = ({
    type: MOVE_SECTION,
    data: { sectionId, distance },
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
