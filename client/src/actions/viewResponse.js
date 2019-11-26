import axios from 'axios';

export const GET_QUESTIONNAIRE_START = 'VIEW_RESPONSE/GET_QUESTIONNAIRE_START';
export const GET_QUESTIONNAIRE_SUCCESS = 'VIEW_RESPONSE/GET_QUESTIONNAIRE_SUCCESS';
export const GET_QUESTIONNAIRE_FAIL = 'VIEW_RESPONSE/GET_QUESTIONNAIRE_FAIL';

/** Load an outdated questionnaire to view response. */
export function loadQuestionnaire(id) {
  return async (dispatch) => {
    dispatch({ type: GET_QUESTIONNAIRE_START });

    try {
      const response = await axios.get(`/api/questionnaire/${id}`);
      const { questionnaire } = response.data;

      dispatch({ type: GET_QUESTIONNAIRE_SUCCESS, data: { questionnaire } });
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GET_QUESTIONNAIRE_FAIL, data: { message } });
    }
  };
}
