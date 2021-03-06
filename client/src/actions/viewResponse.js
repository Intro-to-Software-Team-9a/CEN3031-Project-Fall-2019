import axios from 'axios';

export const GET_QUESTIONNAIRE_START = 'VIEW_RESPONSE/GET_QUESTIONNAIRE_START';
export const GET_QUESTIONNAIRE_SUCCESS = 'VIEW_RESPONSE/GET_QUESTIONNAIRE_SUCCESS';
export const GET_QUESTIONNAIRE_FAIL = 'VIEW_RESPONSE/GET_QUESTIONNAIRE_FAIL';
export const GET_RESPONSES_START = 'GET_RESPONSES_START';
export const GET_RESPONSES_SUCCESS = 'GET_RESPONSES_SUCCESS';
export const GET_RESPONSES_FAIL = 'GET_RESPONSES_FAIL';

/** Load an outdated questionnaire by id (to view old responses). */
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

/** Get all questionnaire responses for the user */
export function getResponses() {
  return async (dispatch) => {
    dispatch({ type: GET_RESPONSES_START });

    try {
      const responses = await axios.get('/api/questionnaireResponse');
      const { questionnaireResponses } = responses.data;

      dispatch({ type: GET_RESPONSES_SUCCESS, data: { questionnaireResponses } });
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GET_RESPONSES_FAIL, data: { message } });
    }
  };
}

/**
 * Get responses and load questionnaire corresponding
 * to response with id = `id`
 */
export function getResponsesAndLoadQuestionnaire(id) {
  return async (dispatch, getState) => {
    // get responses if not already fetched
    let { questionnaireResponses } = getState().viewResponse;

    if (questionnaireResponses.length === 0) {
      await dispatch(getResponses());
      ({ questionnaireResponses } = getState().viewResponse);
    }

    // find said response
    const selectedResponse = questionnaireResponses.find((r) => r._id === id);

    // load corresponding questionnaire
    await dispatch(loadQuestionnaire(selectedResponse.questionnaireId));
  };
}
