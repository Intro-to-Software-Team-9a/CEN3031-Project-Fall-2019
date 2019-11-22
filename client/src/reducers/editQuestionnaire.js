
import {
  ADD_NEW_QUESTION,
  CHANGE_QUESTION_TYPE,
  ADD_RESPONSE,
  defaultQuestion,
  REMOVE_RESPONSE,
} from '../actions/editQuestionnaire';



const defaultState = {
  questions: [defaultQuestion()],
};

export default function questionnaireReducer(state = defaultState, action) {
  const questions = state.questions.slice();

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
  return state;
}
