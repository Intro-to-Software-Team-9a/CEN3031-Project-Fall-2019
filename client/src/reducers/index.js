import { combineReducers } from 'redux';
import count from './count';
import accounts from './accounts';
import profiles from './profiles';
import documents from './documents';

export default combineReducers({
  count,
  accounts,
  profiles,
  documents,
});
