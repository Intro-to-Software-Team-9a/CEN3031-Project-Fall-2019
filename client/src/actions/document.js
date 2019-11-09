import axios from 'axios';

export const GET_DOCUMENTS_START = 'GET_DOCUMENTS_START';
export const GET_DOCUMENTS_SUCCESS = 'GET_DOCUMENTS_SUCCESS';
export const GET_DOCUMENTS_FAIL = 'GET_DOCUMENTS_FAIL';


function getDocumentsSuccess(documents) {
  return {
    type: GET_DOCUMENTS_SUCCESS,
    data: { documents },
  };
}

export function getDocuments() {
  return async (dispatch) => {
    dispatch({ type: GET_DOCUMENTS_START });

    try {
      const response = await axios.get('/api/documents');
      dispatch(getDocumentsSuccess(response.data.documents));
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch({ type: GET_DOCUMENTS_FAIL, data: { message } });
    }
  };
}
