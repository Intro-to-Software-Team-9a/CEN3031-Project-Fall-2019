import axios from 'axios';

import { getProfile, forgetProfile } from './profile';
import { getQuestionnaire } from './questionnaire';
import { getTemplates } from './template';

export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const CHANGE_CREATE_FIELD = 'CHANGE_CREATE_FIELD';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const CREATE_START = 'CREATE_START';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAIL = 'CREATE_FAIL';
export const FORGET_LOGIN_FORM = 'FORGET_LOGIN_FORM';
export const FORGET_CREATE_FORM = 'FORGET_CREATE_FORM';
export const DELETE_ACCOUNT_START = 'DELETE_ACCOUNT_START';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAIL = 'DELETE_ACCOUNT_FAIL';
export const RESET_APPLICATION = 'RESET_APPLICATION';

export function changeLoginField(fieldName, newValue) {
  return {
    type: CHANGE_LOGIN_FIELD,
    data: { fieldName, newValue },
  };
}

export function changeCreateField(fieldName, newValue) {
  return {
    type: CHANGE_CREATE_FIELD,
    data: { fieldName, newValue },
  };
}


export function doLogin({ onSuccess }) {
  return async (dispatch, getState) => {
    const { accounts } = getState();

    const { email, password } = accounts.loginForm;
    dispatch({ type: LOGIN_START });

    try {
      await axios.post('/api/accounts/login', { email, password });
      dispatch({ type: LOGIN_SUCCESS });
      await dispatch(getProfile());
      dispatch({ type: FORGET_LOGIN_FORM });

      const { accounts, profiles } = getState();
      if (accounts.createState.isError || profiles.profileState.isError) {
        return;
      }
      if (!onSuccess) {
        return;
      }
      await onSuccess();
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: LOGIN_FAIL, data: { message } });
    }
  };
}

export function doLogout() {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_START });

    try {
      await axios.post('/api/accounts/logout');
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(forgetProfile());
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: LOGOUT_FAIL, data: { message } });
    }
  };
}

export function doCreateAccount({ onSuccess }) {
  return async (dispatch, getState) => {
    const { accounts } = getState();

    const {
      email, password, confirmpassword, name,
    } = accounts.createForm;
    dispatch({ type: CREATE_START });

    if (password !== confirmpassword) {
      dispatch({ type: CREATE_FAIL, data: { message: 'Passwords do not match.' } });
      return;
    }

    try {
      await axios.post('/api/accounts/create', { email, password, name });
      dispatch({ type: CREATE_SUCCESS });
      dispatch({ type: FORGET_CREATE_FORM });
      await dispatch(getProfile());

      const { accounts, profiles } = getState();
      if (accounts.createState.isError || profiles.profileState.isError) {
        return;
      }
      if (!onSuccess) {
        return;
      }
      await onSuccess();
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: CREATE_FAIL, data: { message } });
    }
  };
}

export function deleteAccount() {
  return async (dispatch) => {
    dispatch({ type: DELETE_ACCOUNT_START });

    try {
      await axios.delete('/api/accounts/delete');
      dispatch({ type: DELETE_ACCOUNT_SUCCESS });
      dispatch(doLogout());
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: DELETE_ACCOUNT_FAIL, data: { message } });
    }
  };
}

/** After account deletion, remove all personal data from redux */
export function resetApplication() {
  return async (dispatch) => {
    dispatch({ type: RESET_APPLICATION });

    // re-grab all the data
    await Promise.all([
      dispatch(getProfile()),
      dispatch(getQuestionnaire()),
      dispatch(getTemplates()),
    ]);
  }
}