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

export function doPurchase(order, total) {
  return async (dispatch, getState) => {
    let state = getState();
    console.log(order.orderID)
    order = { orderID: order.orderID, payerID: order.payerID, total: total};
    await axios.post(`/api/paypal/paypalVerification/`, order)

    dispatch({ type: DO_PURCHASE_START });

    try {
      const templateIds = state.purchase.cart.templates.map((template) => template._id);
      await axios.post('/api/templates/purchase', { templateIds });
      dispatch({ type: DO_PURCHASE_SUCCESS });

      // refresh profile
      await dispatch(getProfile());

      // generate all documents
      await dispatch(generateDocuments(templateIds));
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