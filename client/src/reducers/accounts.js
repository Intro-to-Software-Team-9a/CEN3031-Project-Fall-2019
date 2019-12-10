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
  CHANGE_CHANGE_EMAIL_FIELD,
  CHANGE_CHANGE_PASSWORD_FIELD,
  FORGET_CHANGE_EMAIL_FORM,
  FORGET_CHANGE_PASSWORD_FORM,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_EMAIL_START,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAIL,
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
  changeEmailForm: {
    email: '',
    password: '',
  },
  changePasswordForm: {
    currentpassword: '',
    password: '',
    confirmpassword: '',
  },
  loginState: stateSuccess(),
  changePasswordState: stateSuccess(),
  changeEmailState: stateSuccess(),
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
    case CHANGE_CHANGE_EMAIL_FIELD:
      return {
        ...state,
        changeEmailForm: {
          ...state.changeEmailForm,
          [action.data.fieldName]: action.data.newValue,
        },
      };
    case CHANGE_CHANGE_PASSWORD_FIELD:
      return {
        ...state,
        changePasswordForm: {
          ...state.changePasswordForm,
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
    case FORGET_CHANGE_EMAIL_FORM:
      return { ...state, changeEmailForm: { ...defaultState.changeEmailForm } };
    case FORGET_CHANGE_PASSWORD_FORM:
      return { ...state, changePasswordForm: { ...defaultState.changePasswordForm } };
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
    case CHANGE_EMAIL_START:
      return {
        ...state,
        changeEmailState: stateStart(),
      };
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        changeEmailState: stateSuccess(),
      };
    case CHANGE_EMAIL_FAIL:
      return {
        ...state,
        changeEmailState: stateFailure(action),
      };
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        changePasswordState: stateStart(),
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordState: stateSuccess(),
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changePasswordState: stateFailure(action),
      };
    default:
      return state;
  }
}
