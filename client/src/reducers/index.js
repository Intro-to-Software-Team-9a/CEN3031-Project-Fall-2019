import { combineReducers } from 'redux';
import count from './count';
import accounts from './accounts';
import profiles from './profiles';
import documents from './documents';
import questionnaire from './questionnaire';
import templates from './templates';
import purchase from './purchase';
import editQuestionnaire from './editQuestionnaire';

export default combineReducers({
  count,
  accounts,
  profiles,
  documents,
  questionnaire,
  templates,
  purchase,
  editQuestionnaire,
});
