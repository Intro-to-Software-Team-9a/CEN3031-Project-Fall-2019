import axios from 'axios';

export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';


function getProfileSuccess(profile) {
  return {
    type: GET_PROFILE_SUCCESS,
    data: {
      profile,
    },
  };
}

export function getProfile() {
  return async (dispatch) => {
    dispatch({ type: GET_PROFILE_START });

    try {
      const response = await axios.get('/api/profiles');
      dispatch(getProfileSuccess(response.data.profile));
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch({ type: GET_PROFILE_FAIL, data: { message } });
    }
  };
}
