import axios from 'axios';
import { generateDocuments, getDocuments } from './document';

export const GET_TEMPLATES_START = 'GET_TEMPLATES_START';
export const GET_TEMPLATES_SUCCESS = 'GET_TEMPLATES_SUCCESS';
export const GET_TEMPLATES_FAIL = 'GET_TEMPLATES_FAIL';

/** Fetch all templates from DB */
export function getTemplates() {
  return async (dispatch) => {
    dispatch({ type: GET_TEMPLATES_START });

    try {
      const response = await axios.get('/api/templates/');
      const { templates } = response.data;

      dispatch({ type: GET_TEMPLATES_SUCCESS, data: { templates } });
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GET_TEMPLATES_FAIL, data: { message } });
    }
  };
}

/** Regenerates a template by id */
export function regenerate(id) {
  return async (dispatch) => {
    await dispatch(generateDocuments([id]));
    await dispatch(getDocuments());
  };
}
