import { combineReducers } from 'redux';
import filterReducer from './filters';
import pizzasReducer from './pizzas';
import cart from './cart';
import userReducer from './user';

const rootReducer = combineReducers({
  filterReducer,
  pizzasReducer,
  cart,
  userReducer,
});

export default rootReducer;
