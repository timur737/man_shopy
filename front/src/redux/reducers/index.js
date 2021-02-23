import { combineReducers } from 'redux';
import filterReducer from './filters';
import clothesReducer from './clothes';
import cart from './cart';
import userReducer from './user';

const rootReducer = combineReducers({
  filterReducer,
  clothesReducer,
  cart,
  userReducer,
});

export default rootReducer;
