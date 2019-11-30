import { combineReducers } from 'redux';
import count from './count';
import accounts from './accounts';
import profiles from './profiles';
import documents from './documents';
import questionnaire from './questionnaire';
import templates from './templates';
import purchase from './purchase';
import userInfo from './userInfo'
import editQuestionnaire from './editQuestionnaire';
import viewResponse from './viewResponse';

import { RESET_APPLICATION } from '../actions/account';

const appReducer = combineReducers({
  count,
  accounts,
  profiles,
  documents,
  questionnaire,
  templates,
  purchase,
  userInfo,
  editQuestionnaire,
  viewResponse,
});

const resettableReducer = (state, action) => {
  if (action.type === RESET_APPLICATION) {
    // delete state, causing reset to default value
    state = undefined;
  }

  return appReducer(state, action);
}
export default resettableReducer;