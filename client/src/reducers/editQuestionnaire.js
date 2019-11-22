
import {
  ADD_NEW_QUESTION,
  CHANGE_QUESTION_TYPE,
  ADD_RESPONSE,
  REMOVE_RESPONSE,
  CHANGE_QUESTION_RESPONSE_LABEL,
  CHANGE_QUESTION_RESPONSE_VALUE,
  SWAP_RESPONSE,
  RESET_QUESTIONS,
} from '../actions/editQuestionnaire';



const defaultState = {
  questions: [],
};

export default function questionnaireReducer(state = defaultState, action) {
  const questions = state.questions.slice();

  if (action.type === RESET_QUESTIONS) {
    return { ... state, questions: action.data.questions };
  }

  if (action.type === ADD_NEW_QUESTION) {
    questions.splice(action.data.afterIndex, 0, action.data.question);
    return { ...state, questions };
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
  return state;
}
