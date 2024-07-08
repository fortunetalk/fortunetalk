import { combineReducers } from 'redux';
import settings from './settingsReducer';
import customer from './customerReducer';
import astrologer from './astrologerReducer';
import chat from './chatReducer';
import live from './liveReducer';
import history from './historyReducer';

const rootReducer = combineReducers({
  settings,
  customer,
  astrologer,
  chat,
  live,
  history
});

const appReducer = (state, action) => {
  return rootReducer(state, action);
};

export default appReducer;
