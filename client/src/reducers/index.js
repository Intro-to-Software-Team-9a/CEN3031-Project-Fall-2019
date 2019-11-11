import { combineReducers } from 'redux';
import count from './count';
import accounts from './accounts';
import profiles from './profiles';
import questionnaire from './questionnaire';

export default combineReducers({
  count,
  accounts,
  profiles,
  questionnaire,
});
