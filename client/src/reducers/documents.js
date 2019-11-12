import {
  GET_DOCUMENTS_START,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAIL,
  CHANGE_ACTIVE_DOCUMENT,
  GENERATE_DOCUMENT_START,
  GENERATE_DOCUMENT_SUCCESS,
  GENERATE_DOCUMENT_FAIL,
} from '../actions/document';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  documents: [], // all user's documents
  activeTemplate: undefined, // selected document from documents page
  documentState: stateSuccess(),
  generateState: stateSuccess(),
  templates: [],
};


export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DOCUMENTS_START:
      return {
        ...state,
        documentState: { isWaiting: true, isError: false, error: '' },
      };
    case GET_DOCUMENTS_SUCCESS: {
      // get list of unique templates
      const templates = [];
      action.data.documents.forEach((document) => {
        if (!templates.map((template) => template._id).includes(document.templateId._id)) {
          templates.push(document.templateId);
        }
      });
      return {
        ...state,
        documentState: { isWaiting: false, isError: false, error: '' },
        documents: action.data.documents,
        templates,
      };
    }
    case GET_DOCUMENTS_FAIL:
      return {
        ...state,
        documentState: { isWaiting: false, isError: true, error: action.data.message },
        documents: undefined,
      };
    case GENERATE_DOCUMENT_START:
      return { ...state, generateState: stateStart() };
    case GENERATE_DOCUMENT_SUCCESS:
      return { ...state, generateState: stateSuccess() };
    case GENERATE_DOCUMENT_FAIL:
      return { ...state, generateState: stateFailure(action) };
    case CHANGE_ACTIVE_DOCUMENT:
      return {
        ...state,
        activeTemplate: action.data.activeTemplate,
      };
    default:
      return state;
  }
}
