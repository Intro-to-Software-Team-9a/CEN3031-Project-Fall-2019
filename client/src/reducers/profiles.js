import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
} from '../actions/profile';

const defaultState = {
  profile: undefined,
  profileState: {
    isWaiting: false,
    isError: false,
    error: '',
  },
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_PROFILE_START:
      return {
        ...state,
        profileState: { isWaiting: true, isError: false, error: '' },
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileState: { isWaiting: false, isError: false, error: '' },
        profile: action.data.profile,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profileState: { isWaiting: false, isError: true, error: action.data.message },
        profile: undefined,
      };
    default:
      return state;
  }
}
