import axios from 'axios';

export const GET_USER_INFO_START = 'GET_USER_INFO_START';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL';

function getUserInfoSuccess(userInfo) {
  return {
    type: GET_USER_INFO_SUCCESS,
    data: {
      userInfo,
    },
  };
}


export function getUserInfo() {
  return async (dispatch) => {
    dispatch({ type: GET_USER_INFO_START });

    try {
      const response = await axios.get('/api/user-settings');
      dispatch(getUserInfoSuccess(response.data));
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GET_USER_INFO_FAIL, data: { message } });
    }
  };
}
