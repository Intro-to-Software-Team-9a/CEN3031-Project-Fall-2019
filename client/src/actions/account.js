import axios from 'axios';

import { getProfile, forgetProfile } from './profile';

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


export function doLogin() {
  return async (dispatch, getState) => {
    const { accounts } = getState();

    const { email, password } = accounts.loginForm;
    dispatch({ type: LOGIN_START });

    try {
      await axios.post('/api/accounts/login', { email, password });
      dispatch({ type: LOGIN_SUCCESS });
      await dispatch(getProfile());
    } catch (error) {
      const message = error.response.data.message || error.message;
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
      const message = error.response.data.message || error.message;
      dispatch({ type: LOGOUT_FAIL, data: { message } });
    }
  };
}

export function doCreateAccount() {
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
      await dispatch(getProfile());
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch({ type: CREATE_FAIL, data: { message } });
    }
  };
}
