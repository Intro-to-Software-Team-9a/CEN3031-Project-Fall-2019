import {
  ADD_TEMPLATE,
  REMOVE_TEMPLATE,
  DO_PURCHASE_START,
  DO_PURCHASE_SUCCESS,
  DO_PURCHASE_FAIL,
} from '../actions/purchase';

import { stateStart, stateSuccess, stateFailure } from '../utils/asyncStates';

const defaultState = {
  cart: {
    templates: [],
  },
  purchaseState: stateSuccess(),
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_TEMPLATE:
      const newTemplates = state.cart.templates.slice();
      if (!newTemplates.includes(action.data.template)) {
        newTemplates.push(action.data.template);
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          templates: newTemplates,
        },
      };
    case REMOVE_TEMPLATE:
      const newTemplate = action.data.template;
      return {
        ...state,
        cart: {
          ...state.cart,
          templates: state.cart.templates.filter((template) => template._id !== newTemplate._id),
        },
      };
    case DO_PURCHASE_START:
      return {
        ...state,
        purchaseState: stateStart(),
      };
    case DO_PURCHASE_SUCCESS:
      return {
        ...state,
        purchaseState: stateSuccess(),
      };
    case DO_PURCHASE_FAIL:
      return {
        ...state,
        purchaseState: stateFailure(action),
      };
    default:
      return state;
  }
}
