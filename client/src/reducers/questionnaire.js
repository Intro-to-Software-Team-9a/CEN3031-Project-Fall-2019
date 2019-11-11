import {
  GET_QUESTIONNAIRE_START,
  GET_QUESTIONNAIRE_SUCCESS,
  GET_QUESTIONNAIRE_FAIL,
  CHANGE_FORM,
} from '../actions/questionnaire';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  questionnaire: undefined,
  questionnaireState: stateSuccess(),
  questionnaireResponse: {},
};

export default function questionnaireReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_QUESTIONNAIRE_START:
      return {
        ...state,
        questionnaireState: stateStart(),
      };
    case GET_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        questionnaireState: stateSuccess(),
        questionnaire: action.data.questionnaire,
      };
    case GET_QUESTIONNAIRE_FAIL:
      return {
        ...state,
        questionnaireState: stateFailure(action),
        questionnaire: undefined,
      };
    case CHANGE_FORM:
      const newResponse = Object.assign({}, state.questionnaireResponse, { [action.data.fieldName]: action.data.newValue });
      return {
        ...state,
        questionnaireResponse: newResponse,
      }
    default:
      return state;
  }
}
