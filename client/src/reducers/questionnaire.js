import {
  GET_QUESTIONNAIRE_START,
  GET_QUESTIONNAIRE_SUCCESS,
  GET_QUESTIONNAIRE_FAIL,
  GET_RESPONSE_START,
  GET_RESPONSE_SUCCESS,
  GET_RESPONSE_FAIL,
  CHANGE_FORM,
} from '../actions/questionnaire';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  questionnaire: {},
  questionnaireState: stateSuccess(),
  questionnaireResponse: {},
  questionnaireResponseState: stateSuccess(),
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
        questionnaire: {},
      };
    case GET_RESPONSE_START:
      return {
        ...state,
        questionnaireResponseState: stateStart(),
      };
    case GET_RESPONSE_SUCCESS:
      return {
        ...state,
        questionnaireResponseState: stateSuccess(),
        questionnaireResponse: JSON.parse(action.data.questionnaireResponse.serializedResult),
      };
    case GET_RESPONSE_FAIL:
      return {
        ...state,
        questionnaireResponseState: stateFailure(action),
        questionnaireResponse: {},
      };

    case CHANGE_FORM:
      const newResponse = {
        ...state.questionnaireResponse,
        [action.data.fieldName]: action.data.newValue,
      };
      return {
        ...state,
        questionnaireResponse: newResponse,
      };
    default:
      return state;
  }
}
