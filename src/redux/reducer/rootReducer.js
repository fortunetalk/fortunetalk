import { combineReducers } from 'redux';
import settings from './settingsReducer';
import customer from './customerReducer';
import astrologer from './astrologerReducer';

const rootReducer = combineReducers({
  settings,
  customer,
  astrologer
});

const appReducer = (state, action) => {
  return rootReducer(state, action);
};

export default appReducer;
