import {
  GET_QUESTIONNAIRE_FAIL,
  GET_QUESTIONNAIRE_START,
  GET_QUESTIONNAIRE_SUCCESS,
} from '../actions/viewResponse';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  questionnaire: undefined,
  questionnaireState: stateSuccess(),
};

export default function viewResponseReducer(state = defaultState, action) {
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
    default:
      return state;
  }
}
