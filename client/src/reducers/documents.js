import {
    GET_DOCUMENTS_START,
    GET_DOCUMENTS_SUCCESS,
    GET_DOCUMENTS_FAIL,
  } from '../actions/document';
  
  const defaultState = {
    documents: undefined,
    documentState: {
      isWaiting: false,
      isError: false,
      error: '',
    },
  };

  
  export default function profileReducer(state = defaultState, action) {
    switch (action.type) {
      case GET_DOCUMENTS_START:
        return {
          ...state,
          documentState: { isWaiting: true, isError: false, error: '' },
        };
      case GET_DOCUMENTS_SUCCESS:
        return {
          ...state,
          documentState: { isWaiting: false, isError: false, error: '' },
          documents: action.data.documents,
        };
      case GET_DOCUMENTS_FAIL:
        return {
          ...state,
          documentState: { isWaiting: false, isError: true, error: action.data.message },
          documents: undefined,
        };
      default:
        return state;
    }
  }


  