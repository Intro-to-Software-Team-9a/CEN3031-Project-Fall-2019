import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  FORGET_PROFILE,
  SAVE_PROFILE_START,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAIL,
} from '../actions/profile';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  profile: undefined,
  profileState: stateSuccess(),
  saveProfileState: stateSuccess(),
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_PROFILE_START:
      return {
        ...state,
        profileState: stateStart(),
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileState: stateSuccess(),
        profile: action.data.profile,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profileState: stateFailure(action),
        profile: undefined,
      };
    case SAVE_PROFILE_START:
      return {
        ...state,
        saveProfileState: stateStart(),
      };
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        saveProfileState: stateSuccess(),
      };
    case SAVE_PROFILE_FAIL:
      return {
        ...state,
        saveProfileState: stateFailure(action),
      };
    case FORGET_PROFILE:
      return { ...state, profile: undefined };
    default:
      return state;
  }
}
