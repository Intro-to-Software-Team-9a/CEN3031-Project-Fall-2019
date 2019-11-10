import axios from 'axios';

export const GENERATE_DOCUMENT_START = 'GENERATE_DOCUMENT_START';
export const GENERATE_DOCUMENT_SUCCESS = 'GENERATE_DOCUMENT_SUCCESS';
export const GENERATE_DOCUMENT_FAIL = 'GENERATE_DOCUMENT_FAIL';

export function generateDocument(id) {
  return async (dispatch) => {
    dispatch({ type: GENERATE_DOCUMENT_START });

    try {
      
    }
  }
}
