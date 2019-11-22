import {
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
} from '../actions/userSettings';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  userInfo: undefined,
  userInfoState: stateSuccess(),
};

export default function userInfoReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_USER_INFO_START:
      return {
        ...state,
        userInfoState: stateStart(),
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfoState: stateSuccess(),
        userInfo: action.data.profile,
      };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        userInfoState: stateFailure(action),
        userInfo: undefined,
      };
    default:
      return state;
  }
}
