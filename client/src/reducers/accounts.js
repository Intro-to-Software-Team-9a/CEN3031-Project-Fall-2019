import {
  CHANGE_LOGIN_FIELD,
  CHANGE_CREATE_FIELD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
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
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  },
  loginState: {
    isWaiting: false,
    isError: false,
    error: '',
  },
  logoutState: {
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

function stateStart() {
  return {
    isWaiting: true,
    isError: false,
    error: '',
  };
}

function stateSuccess() {
  return {
    isWaiting: false,
    isError: false,
    error: '',
  };
}

function stateFailure(action) {
  return {
    isWaiting: false,
    isError: true,
    error: action.data.message,
  };
}

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
        loginState: stateStart(),
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginState: stateSuccess(),
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginState: stateFailure(action),
      };
    case LOGOUT_START:
      return {
        ...state,
        logoutState: stateStart(),
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutState: stateSuccess(),
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        logoutState: stateFailure(action),
      };
    case CREATE_START:
      return {
        ...state,
        createState: stateStart(),
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        createState: stateSuccess(),
      };
    case CREATE_FAIL:
      return {
        ...state,
        createState: stateFailure(action),
      };
    default:
      return state;
  }
}
