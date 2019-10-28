import { INCREMENT_COUNT } from '../actions/count';

const defaultState = {
  count: 0,
};

export default function countReducer(state = defaultState, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return Object.assign({}, state, { count: state.count + 1 });
    default:
      return state;
  }
}
