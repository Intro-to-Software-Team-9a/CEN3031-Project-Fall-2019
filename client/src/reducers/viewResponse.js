import {
  GET_QUESTIONNAIRE_FAIL,
  GET_QUESTIONNAIRE_START,
  GET_QUESTIONNAIRE_SUCCESS,
  GET_RESPONSES_START,
  GET_RESPONSES_SUCCESS,
  GET_RESPONSES_FAIL,
} from '../actions/viewResponse';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  questionnaire: undefined,
  questionnaireState: stateSuccess(),
  questionnaireResponses: [],
  questionnaireResponsesState: stateSuccess(),
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
    case GET_RESPONSES_START:
      return {
        ...state,
        questionnaireResponsesState: stateStart(),
      };
    case GET_RESPONSES_SUCCESS:
      return {
        ...state,
        questionnaireResponsesState: stateSuccess(),
        questionnaireResponses: action.data.questionnaireResponses,
      };
    case GET_RESPONSES_FAIL:
      return {
        ...state,
        questionnaireResponsesState: stateFailure(action),
        questionnaireResponses: [],
      };
    default:
      return state;
  }
}
