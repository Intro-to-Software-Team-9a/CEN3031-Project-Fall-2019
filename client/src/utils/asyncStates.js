
/** Returns state for async action start */
export function stateStart() {
  return {
    isWaiting: true,
    isError: false,
    error: '',
  };
}
/** Returns state for async action success */
export function stateSuccess() {
  return {
    isWaiting: false,
    isError: false,
    error: '',
  };
}

/** Returns state for async action fail */
export function stateFailure(action) {
  return {
    isWaiting: false,
    isError: true,
    error: action.data.message,
  };
}
