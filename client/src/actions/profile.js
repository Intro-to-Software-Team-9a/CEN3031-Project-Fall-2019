import axios from 'axios';

import { getUserInfo } from './userSettings';
import { getResponse } from './questionnaire';

export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';
export const FORGET_PROFILE = 'FORGET_PROFILE';
export const SAVE_PROFILE_START = 'SAVE_PROFILE_START';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const SAVE_PROFILE_FAIL = 'SAVE_PROFILE_FAIL';

function getProfileSuccess(profile) {
  return {
    type: GET_PROFILE_SUCCESS,
    data: {
      profile,
    },
  };
}

export function forgetProfile() {
  return {
    type: FORGET_PROFILE,
  };
}

export function getProfile() {
  return async (dispatch) => {
    dispatch({ type: GET_PROFILE_START });

    try {
      const response = await axios.get('/api/profiles');
      dispatch(getProfileSuccess(response.data.profile));

      // fetch additional info for settings
      await dispatch(getUserInfo());

      // fetch questionnaire response if necessary
      await dispatch(getResponse());

    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: GET_PROFILE_FAIL, data: { message } });
    }
  };
}

export function saveOnboardingState(newState) {
  return async (dispatch, getState) => {

    const { profiles } = getState();
    const { onboardingState } = profiles.profile || {};

    // no need to update if decrement
    if (!!onboardingState && newState <= onboardingState) {
      return;
    }

    await dispatch(saveProfile({ onboardingState: newState }));
  }
}

export function finishOnboarding() {
  return async (dispatch) => {
    await dispatch(saveProfile({ isOnboarding: false }));
  }
}

function saveProfile(profilePatch) {
  return async (dispatch) => {
    dispatch({ type: SAVE_PROFILE_START });

    try {
      await axios.patch('/api/profiles/onboarding', profilePatch);
      dispatch({ type: SAVE_PROFILE_SUCCESS });

      // refresh local profile
      await dispatch(getProfile());
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: SAVE_PROFILE_FAIL, data: { message } });
    }
  };
}
