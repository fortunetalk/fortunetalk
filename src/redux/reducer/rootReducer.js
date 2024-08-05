import { combineReducers } from 'redux';
import settings from './settingsReducer';
import customer from './customerReducer';
import astrologer from './astrologerReducer';
import eCommerce from './eCommerceReducer';
import courses from './courseReducer';
import chat from './chatReducer';
import live from './liveReducer';
import history from './historyReducer';
import banners from './banners';
import call from './callReducer';
import cart from './cartReducer';
import payment from './paymentReducer';
import Mcq from './McqReducer';

const rootReducer = combineReducers({
  settings,
  customer,
  astrologer,
  eCommerce,
  courses,
  chat,
  live,
  history,
  banners,
  call,
  cart,
  payment,
  Mcq
});

const appReducer = (state, action) => {
  return rootReducer(state, action);
};

export default appReducer;
