
import {
  ADD_NEW_QUESTION,
  ADD_NEW_SECTION,
  DELETE_QUESTION,
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_TITLE,
  ADD_RESPONSE,
  REMOVE_RESPONSE,
  CHANGE_QUESTION_RESPONSE_LABEL,
  CHANGE_QUESTION_RESPONSE_VALUE,
  SAVE_QUESTIONNAIRE_START,
  SAVE_QUESTIONNAIRE_FAIL,
  SAVE_QUESTIONNAIRE_SUCCESS,
  SWAP_RESPONSE,
  RESET_QUESTIONS,
  SWAP_QUESTIONS,
  DELETE_SECTION,
  CHANGE_SECTION_TITLE,
} from '../actions/editQuestionnaire';

import { stateStart, stateFailure, stateSuccess } from '../utils/asyncStates';

const defaultState = {
  questions: [],
  sections: [],
  loadingState: stateSuccess(),
};

export default function questionnaireReducer(state = defaultState, action) {
  const questions = state.questions.slice();
  const sections = state.sections.slice();

  if (action.type === SAVE_QUESTIONNAIRE_START) {
    return { ...state, loadingState: stateStart() };
  }
  if (action.type === SAVE_QUESTIONNAIRE_SUCCESS) {
    return { ...state, loadingState: stateSuccess() };
  }
  if (action.type === SAVE_QUESTIONNAIRE_FAIL) {
    return { ...state, loadingState: stateFailure(action) };
  }

  if (action.type === RESET_QUESTIONS) {
    return {
      ...state,
      questions: action.data.questions,
      sections: action.data.sections,
    };
  }

  if (action.type === ADD_NEW_QUESTION) {
    questions.splice(action.data.afterIndex, 0, action.data.question);
    return { ...state, questions };
  }

  if (action.type === ADD_NEW_SECTION) {
    const { startIndex } = action.data.section;
    const afterIndex = sections.findIndex(
      (section) => section.startIndex < startIndex,
    );

    if (afterIndex !== -1) {
      sections.splice(afterIndex, 0, action.data.section);
    } else {
      sections.push(action.data.section);
    }

    return { ...state, sections };
  }

  if (action.type === DELETE_QUESTION) {
    questions.splice(action.data.index, 1);
    return { ...state, questions };
  }

  if (action.type === DELETE_SECTION) {
    // delete the section
    const index = sections.findIndex((section) => section._id === action.data.sectionId);
    sections.splice(index, 1);

    // relabel the startIndex-es if necessary
    if (index === 0) {
      sections[0] = { ...sections[0], startIndex: 0 };
    }

    return { ...state, sections };
  }

  if (action.type === CHANGE_QUESTION_TYPE) {
    const question = questions[action.data.index];
    const updatedQuestion = {
      ...question,
      questionType: action.data.newType,
      possibleResponses: action.data.newResponses,
    };

    questions[action.data.index] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === CHANGE_QUESTION_TITLE) {
    const question = questions[action.data.index];
    const updatedQuestion = {
      ...question,
      title: action.data.newTitle,
    };

    questions[action.data.index] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === CHANGE_SECTION_TITLE) {
    const index = sections.findIndex((section) => section._id === action.data.sectionId);

    sections[index] = { ...sections[index], title: action.data.newTitle };
    return { ...state, sections };
  }

  if (action.type === ADD_RESPONSE) {
    const question = questions[action.data.questionIndex];
    const responses = question.possibleResponses.slice();

    responses.splice(action.data.responseIndex + 1, 0, action.data.response);

    const updatedQuestion = { ...question, possibleResponses: responses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === REMOVE_RESPONSE) {
    const question = questions[action.data.questionIndex];
    const responses = question.possibleResponses.slice();

    responses.splice(action.data.responseIndex, 1);

    const updatedQuestion = { ...question, possibleResponses: responses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === CHANGE_QUESTION_RESPONSE_LABEL) {
    const question = questions[action.data.questionIndex];
    const responses = question.possibleResponses.slice();

    const response = responses[action.data.responseIndex];
    const updatedResponse = { ...response, label: action.data.label };

    responses.splice(action.data.responseIndex, 1, updatedResponse);
    const updatedQuestion = { ...question, possibleResponses: responses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === CHANGE_QUESTION_RESPONSE_VALUE) {
    const question = questions[action.data.questionIndex];
    const responses = question.possibleResponses.slice();


    const response = responses[action.data.responseIndex];
    const updatedResponse = { ...response, value: action.data.value };

    responses.splice(action.data.responseIndex, 1, updatedResponse);
    const updatedQuestion = { ...question, possibleResponses: responses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === SWAP_RESPONSE) {
    const question = questions[action.data.questionIndex];
    const responses = question.possibleResponses.slice();

    // swap responses
    const i1 = action.data.index1;
    const i2 = action.data.index2;
    const temp = responses[i1];
    responses[i1] = responses[i2];
    responses[i2] = temp;

    const updatedQuestion = { ...question, possibleResponses: responses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === SWAP_QUESTIONS) {
    // swap responses
    const i1 = action.data.index1;
    const i2 = action.data.index2;
    const temp = questions[i1];
    questions[i1] = questions[i2];
    questions[i2] = temp;

    return { ...state, questions };
  }
  return state;
}
