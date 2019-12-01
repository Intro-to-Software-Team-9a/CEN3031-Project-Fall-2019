import axios from 'axios';
import { getProfile } from './profile';
import { generateDocuments } from './document';

export const ADD_TEMPLATE = 'ADD_TEMPLATE';
export const REMOVE_TEMPLATE = 'REMOVE_TEMPLATE';
export const DO_PURCHASE_START = 'DO_PURCHASE_START';
export const DO_PURCHASE_SUCCESS = 'DO_PURCHASE_SUCCESS';
export const DO_PURCHASE_FAIL = 'DO_PURCHASE_FAIL';

export function addTemplate(template) {
  return {
    type: ADD_TEMPLATE,
    data: { template },
  };
}

export function removeTemplate(template) {
  return {
    type: REMOVE_TEMPLATE,
    data: { template },
  };
}

export function doPurchase({ onSuccess }) {
  return async (dispatch, getState) => {
    let state = getState();

    dispatch({ type: DO_PURCHASE_START });

    try {
      const templateTypeIds = state.purchase.cart.templates.map((templateType) => templateType._id);
      await axios.post('/api/templates/purchase', { templateTypeIds });
      dispatch({ type: DO_PURCHASE_SUCCESS });

      // refresh profile
      await dispatch(getProfile());

      // generate all documents
      await dispatch(generateDocuments(templateTypeIds));

      // call onSuccess if no error occurred
      state = getState();
      if (state.purchase.purchaseState.isError || state.profiles.profileState.isError) {
        return;
      }
      await onSuccess();
    } catch (error) {
      // parse HTTP message
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      dispatch({ type: DO_PURCHASE_FAIL, data: { message } });
    }
  };
}
