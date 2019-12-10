import axios from 'axios';

export const GET_QUESTIONNAIRE_START = 'GET_QUESTIONNAIRE_START';
export const GET_QUESTIONNAIRE_SUCCESS = 'GET_QUESTIONNAIRE_SUCCESS';
export const GET_QUESTIONNAIRE_FAIL = 'GET_QUESTIONNAIRE_FAIL';
export const GET_RESPONSE_START = 'GET_RESPONSE_START';
export const GET_RESPONSE_SUCCESS = 'GET_RESPONSE_SUCCESS';
export const GET_RESPONSE_FAIL = 'GET_RESPONSE_FAIL';
export const SUBMIT_FORM_START = 'SUBMIT_FORM_START';
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
export const SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
export const CHANGE_FORM = 'QUESTIONNAIRE/CHANGE_FORM';

export function changeForm(fieldName, newValue) {
  return ({
    type: CHANGE_FORM,
    data: { fieldName, newValue },
  });
}

/** Submit the questionnaire. */
export function submitForm() {
  return async (dispatch, getState) => {
    const { questionnaire } = getState();
    dispatch({ type: SUBMIT_FORM_START });

    const questionnaireId = questionnaire.questionnaire._id;

    try {
      await axios.post(
        `/api/questionnaireResponse/${questionnaireId}`,
        { questionnaireResponse: questionnaire.questionnaireResponse },
      );

      dispatch({ type: SUBMIT_FORM_SUCCESS });
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: SUBMIT_FORM_FAIL, data: { message } });
    }
  };
}


/** Submit a temporary questionnaireresponse. */
export function submitTempForm() {
  return async (dispatch, getState) => {
    const { questionnaire } = getState();
    dispatch({ type: SUBMIT_FORM_START });

    const questionnaireId = questionnaire.questionnaire._id;

    try {
      await axios.post(
        `/api/questionnaireResponse/${questionnaireId}`,
        {
          questionnaireResponse: questionnaire.questionnaireResponse,
          isTemp: true,
        },
      );

      dispatch({ type: SUBMIT_FORM_SUCCESS });
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: SUBMIT_FORM_FAIL, data: { message } });
    }
  };
}


/** Get the most recent questionnaire from the database. */
export function getQuestionnaire() {
  return async (dispatch) => {
    dispatch({ type: GET_QUESTIONNAIRE_START });

    try {
      const response = await axios.get('/api/questionnaire');
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

/** Get latest questionnaire response for this user. */
export function getResponse() {
  return async (dispatch) => {
    dispatch({ type: GET_RESPONSE_START });

    try {
      const response = await axios.get('/api/questionnaireResponse/latest');
      const { questionnaireResponse } = response.data;

      dispatch({ type: GET_RESPONSE_SUCCESS, data: { questionnaireResponse } });
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GET_RESPONSE_FAIL, data: { message } });
    }
  };
}
