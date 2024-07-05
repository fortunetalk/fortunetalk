import { combineReducers } from 'redux';
import settings from './settingsReducer';
import customer from './customerReducer';
import astrologer from './astrologerReducer';
import eCommerce from './eCommerceReducer';
import courses from './courseReducer';
import chat from './chatReducer';

const rootReducer = combineReducers({
  settings,
  customer,
  astrologer,
  eCommerce,
  courses,
  chat
});

const appReducer = (state, action) => {
  return rootReducer(state, action);
};

export default appReducer;
