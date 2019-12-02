import axios from 'axios';

export const GET_DOCUMENTS_START = 'GET_DOCUMENTS_START';
export const GET_DOCUMENTS_SUCCESS = 'GET_DOCUMENTS_SUCCESS';
export const GET_DOCUMENTS_FAIL = 'GET_DOCUMENTS_FAIL';
export const CHANGE_ACTIVE_DOCUMENT = 'CHANGE_ACTIVE_DOCUMENT';
export const GENERATE_DOCUMENT_START = 'GENERATE_DOCUMENT_START';
export const GENERATE_DOCUMENT_SUCCESS = 'GENERATE_DOCUMENT_SUCCESS';
export const GENERATE_DOCUMENT_FAIL = 'GENERATE_DOCUMENT_FAIL';

function getDocumentsSuccess(documents) {
  return {
    type: GET_DOCUMENTS_SUCCESS,
    data: { documents },
  };
}

export function changeActiveTemplate(activeTemplate) {
  return {
    type: CHANGE_ACTIVE_DOCUMENT,
    data: { activeTemplate },
  };
}

export function getDocuments() {
  return async (dispatch) => {
    dispatch({ type: GET_DOCUMENTS_START });

    try {
      const response = await axios.get('/api/documents');
      dispatch(getDocumentsSuccess(response.data.documents));
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GET_DOCUMENTS_FAIL, data: { message } });
    }
  };
}

export function generateDocuments(templateTypeIds) {
  return async (dispatch) => {
    dispatch({ type: GENERATE_DOCUMENT_START });

    try {
      // generate all the documents
      await Promise.all(templateTypeIds.map((templateTypeId) => axios.get(`/api/documents/generate/${templateTypeId}`)));

      dispatch({ type: GENERATE_DOCUMENT_SUCCESS });
    } catch (error) {
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GENERATE_DOCUMENT_FAIL, data: { message } });
    }
  };
}
