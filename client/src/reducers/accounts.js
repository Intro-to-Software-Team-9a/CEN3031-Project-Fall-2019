import {
  CHANGE_LOGIN_FIELD,
  CHANGE_CREATE_FIELD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CREATE_FAIL,
  CREATE_START,
  CREATE_SUCCESS,
} from '../actions/account';

const defaultState = {
  loginForm: {
    email: '',
    password: '',
  },
  createForm: {
    email: '',
    password: '',
    confirmpassword: '',
  },
  loginState: {
    isWaiting: false,
    isError: false,
    error: '',
  },
  createState: {
    isWaiting: false,
    isError: false,
    error: '',
  },
};

export default function accountReducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_LOGIN_FIELD:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
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
    case LOGIN_START:
      return {
        ...state,
        loginState: {
          isWaiting: true,
          isError: false,
          error: '',
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginState: {
          isWaiting: false,
          isError: false,
          error: '',
        },
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginState: {
          isWaiting: false,
          isError: true,
          error: action.data.message,
        },
      };
    case CREATE_START:
      return {
        ...state,
        createState: {
          isWaiting: true,
          isError: false,
          error: '',
        },
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        createState: {
          isWaiting: false,
          isError: false,
          error: '',
        },
      };
    case CREATE_FAIL:
      return {
        ...state,
        createState: {
          isWaiting: false,
          isError: true,
          error: action.data.message,
        },
      };
    default:
      return state;
  }
}
