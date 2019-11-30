import {
  CHANGE_LOGIN_FIELD,
  CHANGE_CREATE_FIELD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CREATE_FAIL,
  CREATE_START,
  CREATE_SUCCESS,
  FORGET_CREATE_FORM,
  FORGET_LOGIN_FORM,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  RESET_APPLICATION,
} from '../actions/account';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  loginForm: {
    email: '',
    password: '',
  },
  createForm: {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  },
  loginState: stateSuccess(),
  logoutState: stateSuccess(),
  createState: stateSuccess(),
  deleteAccountState: stateSuccess(),
  isAccountDeleted: false,
};

export default function accountReducer(state = defaultState, action) {
  switch (action.type) {
    case DELETE_ACCOUNT_START:
      return { ...state, deleteAccountState: stateStart() };
    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, deleteAccountState: stateSuccess(), isAccountDeleted: true };
    case DELETE_ACCOUNT_FAIL:
      return { ...state, deleteAccountState: stateFailure(action), isAccountDeleted: false };
    case RESET_APPLICATION:
      return { ...state, isAccountDeleted: false };
    case CHANGE_LOGIN_FIELD:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.data.fieldName]: action.data.newValue,
        },
      };
    case CHANGE_CREATE_FIELD:
      return {
        ...state,
        createForm: {
          ...state.createForm,
          [action.data.fieldName]: action.data.newValue,
        },
      };
    case FORGET_CREATE_FORM:
      return { ...state, createForm: { ...defaultState.createForm } };
    case FORGET_LOGIN_FORM:
      return { ...state, loginForm: { ...defaultState.loginForm } };
    case LOGIN_START:
      return {
        ...state,
        loginState: stateStart(),
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginState: stateSuccess(),
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginState: stateFailure(action),
      };
    case LOGOUT_START:
      return {
        ...state,
        logoutState: stateStart(),
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutState: stateSuccess(),
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        logoutState: stateFailure(action),
      };
    case CREATE_START:
      return {
        ...state,
        createState: stateStart(),
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        createState: stateSuccess(),
      };
    case CREATE_FAIL:
      return {
        ...state,
        createState: stateFailure(action),
      };
    default:
      return state;
  }
}
