import { combineReducers } from 'redux';
import count from './count';
import accounts from './accounts';
import profiles from './profiles';

export default combineReducers({
  count,
  accounts,
  profiles,
});
