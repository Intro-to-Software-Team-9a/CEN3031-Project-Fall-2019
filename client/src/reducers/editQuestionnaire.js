import uuid from 'uuid/v4';

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
  MOVE_SECTION,
  CHANGE_SECTION_SHOWN,
} from '../actions/editQuestionnaire';

import { stateStart, stateFailure, stateSuccess } from '../utils/asyncStates';

// NOTE: this data is stored in normalized form
// for performance purposes (to prevent unncecessary re-rendering)
const defaultState = {
  questions: [], // questions have possibleResponses projected onto _id
  sections: [],
  responses: [], // responses are normalized from questions
  duplicateLabels: [],
  loadingState: stateSuccess(),
};

export default function questionnaireReducer(state = defaultState, action) {
  const questions = state.questions.slice();
  const sections = state.sections.slice();
  const responses = state.responses.slice();

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
      questions: action.data.questions || [],
      sections: action.data.sections || [],
      responses: action.data.responses || [],
    };
  }

  if (action.type === ADD_NEW_QUESTION) {
    const { question, afterIndex } = action.data;
    const { possibleResponses } = question;

    // normalize data by splitting
    // possibleResponses from questions
    const normalizedQuestion = {
      ...question,
      possibleResponses: question.possibleResponses.map((r) => r._id),
    };

    // update state
    questions.splice(afterIndex, 0, normalizedQuestion);
    const newResponses = responses.concat(possibleResponses);
    const newSections = sections.map((section) => {
      // if section is after new question shift forward by 1
      if (section.startIndex > 0 && section.startIndex >= afterIndex) {
        return { ...section, startIndex: section.startIndex + 1 };
      }
      return { ...section };
    });
    return {
      ...state, questions, responses: newResponses, sections: newSections,
    };
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
    const question = questions[action.data.index];
    // delete the responses for the question
    const newResponses = responses.filter((r) => !question.possibleResponses.includes(r._id));
    // delete the question
    questions.splice(action.data.index, 1);

    const newSections = sections.map((section) => {
      // if section is after deleted question shift backward by 1
      if (section.startIndex > action.data.index) {
        return { ...section, startIndex: section.startIndex - 1 };
      }
      return { ...section };
    });
    return {
      ...state, questions, responses: newResponses, sections: newSections,
    };
  }

  if (action.type === DELETE_SECTION) {
    // delete the section
    const index = sections.findIndex((section) => section._id === action.data.sectionId);
    sections.splice(index, 1);

    // if no more sections left, add one at the beginning
    if (sections.length === 0) {
      const newSection = ({
        title: 'Untitled Section',
        _id: uuid(),
        startIndex: 0,
        isShownBeforeLogin: true,
      });
      sections.push(newSection);
      return { ...state, sections };
    }

    // otherwise just ensure there is a section with startindex 0
    const sortedSections = sections.slice().sort((s1, s2) => s1.startIndex - s2.startIndex);

    // relabel the startIndex-es if necessary
    sortedSections[0] = { ...sortedSections[0], startIndex: 0 };

    return { ...state, sections: sortedSections };
  }

  if (action.type === MOVE_SECTION) {
    const index = sections.findIndex((section) => section._id === action.data.sectionId);
    const section = sections[index];

    // whether there's another section with startindex 0
    const countStartingIndexZero = (sum, curr) => sum + ((curr.startIndex === 0) ? 1 : 0);
    const numSectionsIndex0 = sections.reduce(countStartingIndexZero, 0);
    const isAnotherStartingSection = numSectionsIndex0 > 1;

    // update section startIndex
    const startIndex = section.startIndex + action.data.distance;
    sections[index] = { ...section, startIndex };

    // if there's no section at the front, then add one
    if (section.startIndex === 0 && !isAnotherStartingSection) {
      // create new section
      const newSection = ({
        title: 'Untitled Section',
        _id: uuid(),
        startIndex: 0,
        isShownBeforeLogin: true,
      });
      sections.splice(0, 0, newSection);
    }

    return { ...state, sections };
  }

  if (action.type === CHANGE_QUESTION_TYPE) {
    const question = questions[action.data.index];

    // delete the old resposnes and add the new ones
    const newResponses = responses
      .filter((r) => !question.possibleResponses.includes(r._id))
      .concat(action.data.newResponses);

    // sanitize the question
    const updatedQuestion = {
      ...question,
      questionType: action.data.newType,
      possibleResponses: action.data.newResponses.map((r) => r._id),
    };

    questions[action.data.index] = updatedQuestion;
    return { ...state, questions, responses: newResponses };
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

  if (action.type === CHANGE_SECTION_SHOWN) {
    const index = sections.findIndex((section) => section._id === action.data.sectionId);

    sections[index] = { ...sections[index], isShownBeforeLogin: action.data.newValue };
    return { ...state, sections };
  }

  if (action.type === ADD_RESPONSE) {
    const question = questions[action.data.questionIndex];
    const possibleResponses = question.possibleResponses.slice();

    // add response to question
    possibleResponses.splice(action.data.responseIndex + 1, 0, action.data.response._id);

    // add response to global list
    responses.push(action.data.response);

    const updatedQuestion = { ...question, possibleResponses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions, responses };
  }

  if (action.type === REMOVE_RESPONSE) {
    const question = questions[action.data.questionIndex];
    const possibleResponses = question.possibleResponses.slice();
    const responseId = question.possibleResponses[action.data.responseIndex];

    // remove response from global list
    const newResponses = responses.filter((r) => r._id !== responseId);

    // remove response from question
    possibleResponses.splice(action.data.responseIndex, 1);

    const updatedQuestion = { ...question, possibleResponses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions, responses: newResponses };
  }

  if (action.type === CHANGE_QUESTION_RESPONSE_LABEL) {
    const question = questions[action.data.questionIndex];
    const responseId = question.possibleResponses[action.data.responseIndex];

    const currResponseIndex = responses.findIndex((r) => r._id === responseId);
    const currResponse = responses[currResponseIndex];
    const updatedResponse = { ...currResponse, label: action.data.label };

    responses.splice(currResponseIndex, 1, updatedResponse);
    return { ...state, responses };
  }

  if (action.type === CHANGE_QUESTION_RESPONSE_VALUE) {
    const question = questions[action.data.questionIndex];
    const responseId = question.possibleResponses[action.data.responseIndex];

    const currResponseIndex = responses.findIndex((r) => r._id === responseId);
    const currResponse = responses[currResponseIndex];
    const updatedResponse = { ...currResponse, value: action.data.value };

    responses.splice(currResponseIndex, 1, updatedResponse);
    return { ...state, responses };
  }

  if (action.type === SWAP_RESPONSE) {
    const question = questions[action.data.questionIndex];
    const possibleResponses = question.possibleResponses.slice();

    // swap responses
    const i1 = action.data.index1;
    const i2 = action.data.index2;
    const temp = possibleResponses[i1];
    possibleResponses[i1] = possibleResponses[i2];
    possibleResponses[i2] = temp;

    const updatedQuestion = { ...question, possibleResponses };
    questions[action.data.questionIndex] = updatedQuestion;
    return { ...state, questions };
  }

  if (action.type === SWAP_QUESTIONS) {
    // swap
    const i1 = action.data.index1;
    const i2 = action.data.index2;
    const temp = questions[i1];
    questions[i1] = questions[i2];
    questions[i2] = temp;

    return { ...state, questions };
  }

  return state;
}
