import axios from 'axios';

import { getProfile, forgetProfile } from './profile';
import { getQuestionnaire, submitTempForm } from './questionnaire';
import { getTemplates } from './template';
import { getUserInfo } from './userSettings';

export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const CHANGE_CREATE_FIELD = 'CHANGE_CREATE_FIELD';
export const CHANGE_CHANGE_PASSWORD_FIELD = 'CHANGE_CHANGE_PASSWORD_FIELD';
export const CHANGE_CHANGE_EMAIL_FIELD = 'CHANGE_CHANGE_EMAIL_FIELD';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const CREATE_START = 'CREATE_START';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAIL = 'CREATE_FAIL';

export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';
export const CHANGE_EMAIL_START = 'CHANGE_EMAIL_START';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_FAIL = 'CHANGE_EMAIL_FAIL';
export const FORGET_LOGIN_FORM = 'FORGET_LOGIN_FORM';
export const FORGET_CREATE_FORM = 'FORGET_CREATE_FORM';
export const FORGET_CHANGE_PASSWORD_FORM = 'FORGET_CHANGE_PASSWORD_FORM';
export const FORGET_CHANGE_EMAIL_FORM = 'FORGET_CHANGE_EMAIL_FORM';
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

export function changeChangePasswordField(fieldName, newValue) {
  return {
    type: CHANGE_CHANGE_PASSWORD_FIELD,
    data: { fieldName, newValue },
  };
}

export function changeChangeEmailField(fieldName, newValue) {
  return {
    type: CHANGE_CHANGE_EMAIL_FIELD,
    data: { fieldName, newValue },
  };
}


/** Tries to log in user using data from the loginForm in Redux */
export function doLogin({ onSuccess }) {
  return async (dispatch, getState) => {
    const { accounts } = getState();

    const { email, password } = accounts.loginForm;
    dispatch({ type: LOGIN_START });

    try {
      await axios.post('/api/accounts/login', { email, password });

      // successful login
      dispatch({ type: LOGIN_SUCCESS });
      dispatch({ type: FORGET_LOGIN_FORM });

      // fetch profile data
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
      dispatch({ type: LOGIN_FAIL, data: { message } });
    }
  };
}

/** Tries to log out user and then forgets their local information */
export function doLogout(onSuccess) {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_START });

    try {
      await axios.post('/api/accounts/logout');
      dispatch({ type: LOGOUT_SUCCESS });

      // forget the user's profile info from the client
      // for security reasons
      dispatch(forgetProfile());

      if (onSuccess) {
        await onSuccess();
      }
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

/** Tries to create account for user using data from the createForm in Redux */
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

      // delete form data (i.e., password)
      dispatch({ type: FORGET_CREATE_FORM });

      // save current questionnaire state
      await dispatch(submitTempForm());

      // refresh profile data
      await dispatch(getProfile());

      // determine if it was successful
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


export function doChangePassword({ onSuccess }) {
  return async (dispatch, getState) => {
    const { accounts } = getState();

    const {
      currentpassword, password, confirmpassword,
    } = accounts.changePasswordForm;
    dispatch({ type: CHANGE_PASSWORD_START });

    if (password !== confirmpassword) {
      dispatch({ type: CHANGE_PASSWORD_FAIL, data: { message: 'Passwords do not match.' } });
      return;
    }

    try {
      await axios.post('/api/accounts/password', { currentpassword, password });
      dispatch({ type: CHANGE_PASSWORD_SUCCESS });

      // delete form data (i.e., password)
      dispatch({ type: FORGET_CHANGE_PASSWORD_FORM });

      // determine if it was successful
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
      dispatch({ type: CHANGE_PASSWORD_FAIL, data: { message } });
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

export function doChangeEmail({ onSuccess }) {
  return async (dispatch, getState) => {
    const { accounts } = getState();

    const {
      email, password,
    } = accounts.changeEmailForm;
    dispatch({ type: CHANGE_EMAIL_START });

    try {
      await axios.post('/api/accounts/email', { email, password });
      dispatch({ type: CHANGE_EMAIL_SUCCESS });

      // delete form data (i.e., password)
      dispatch({ type: FORGET_CHANGE_EMAIL_FORM });

      // refresh profile data
      await dispatch(getUserInfo());

      // determine if it was successful
      const { accounts, userInfo } = getState();
      if (accounts.createState.isError || userInfo.userInfoState.isError) {
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
      dispatch({ type: CHANGE_EMAIL_FAIL, data: { message } });
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
  };
}
