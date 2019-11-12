import axios from 'axios';
import { getProfile } from './profile';

export const ADD_TEMPLATE = 'ADD_TEMPLATE';
export const REMOVE_TEMPLATE = 'REMOVE_TEMPLATE';
export const DO_PURCHASE_START = 'DO_PURCHASE_START';
export const DO_PURCHASE_SUCCESS = 'DO_PURCHASE_SUCCESS';
export const DO_PURCHASE_FAIL = 'DO_PURCHASE_FAIL';

export function addTemplate(template) {
  return {
    type: ADD_TEMPLATE,
    data: { template }
  };
}

export function removeTemplate(template) {
  return {
    type: REMOVE_TEMPLATE,
    data: { template }
  };
}

export function doPurchase() {
  return async (dispatch, getState) => {
    const { purchase } = getState();

    dispatch({ type: DO_PURCHASE_START });

    try {
      await axios.post('/api/templates/purchase', { templateIds: purchase.cart.templates.map(template => template._id) });
      dispatch({ type: DO_PURCHASE_SUCCESS });
      dispatch(getProfile());
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch({ type: DO_PURCHASE_FAIL, data: { message } });
    }
  };
}
