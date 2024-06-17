import { combineReducers } from 'redux';
import settings from './settingsReducer';
import customer from './customerReducer';
import astrologer from './astrologerReducer';
import eCommerce from './eCommerceReducer';
import courses from './courseReducer';

const rootReducer = combineReducers({
  settings,
  customer,
  astrologer,
  eCommerce,
  courses,
});

const appReducer = (state, action) => {
  return rootReducer(state, action);
};

export default appReducer;
