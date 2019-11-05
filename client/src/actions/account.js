import axios from 'axios';

import { getProfile } from './profile';

export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const CHANGE_CREATE_FIELD = 'CHANGE_CREATE_FIELD';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const CREATE_START = 'CREATE_START';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAIL = 'CREATE_FAIL';


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
      dispatch(getProfile());
    } catch (error) {
      console.log(error.response);
      const message = error.response.data.message || error.message;
      dispatch({ type: LOGIN_FAIL, data: { message } });
    }
  };
}

export function doCreateAccount() {
  return async (dispatch, getState) => {
    const { accounts } = getState();

    const { email, password, confirmpassword } = accounts.createForm;
    dispatch({ type: CREATE_START });

    if (password !== confirmpassword) {
      dispatch({ type: CREATE_FAIL, data: { message: 'Passwords do not match.' } });
      return;
    }

    try {
      await axios.post('/api/accounts/create', { email, password });
      dispatch({ type: CREATE_SUCCESS });
      dispatch(getProfile());
    } catch (error) {
      console.log(error.response);
      const message = error.response.data.message || error.message;
      dispatch({ type: CREATE_FAIL, data: { message } });
    }
  };
}
