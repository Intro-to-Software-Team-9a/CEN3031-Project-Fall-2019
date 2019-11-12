import {
  GET_TEMPLATES_START,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_FAIL,
} from '../actions/template';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  templates: [],
  templatesState: stateSuccess(),
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_TEMPLATES_START:
      return {
        ...state,
        templatesState: stateStart(),
      };
    case GET_TEMPLATES_SUCCESS:
      return {
        ...state,
        templatesState: stateSuccess(),
        templates: action.data.templates,
      };
    case GET_TEMPLATES_FAIL:
      return {
        ...state,
        templatesState: stateFailure(action),
        templates: [],
      };
    default:
      return state;
  }
}
