import axios from 'axios';

export const GET_TEMPLATES_START = 'GET_TEMPLATES_START';
export const GET_TEMPLATES_SUCCESS = 'GET_TEMPLATES_SUCCESS';
export const GET_TEMPLATES_FAIL   = 'GET_TEMPLATES_FAIL';

/** Fetch all templates from DB */
export function getTemplates() {
  return async (dispatch) => {
    dispatch({ type: GET_TEMPLATES_START });

    try {
      const response = await axios.get('/api/templates/');
      const templates = response.data.templates;

      dispatch({ type: GET_TEMPLATES_SUCCESS, data: { templates }});
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch({ type: GET_TEMPLATES_FAIL, data: { message } });
    }
  };
}
