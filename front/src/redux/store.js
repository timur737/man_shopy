import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveState = (state) => {
  const serialisedState = JSON.stringify(state);
  window.localStorage.setItem('app_state', serialisedState);
};

const loadState = () => {
  const serialisedState = window.localStorage.getItem('app_state');
  if (!serialisedState) return undefined;
  return JSON.parse(serialisedState);
};

const oldState = loadState();

const store = createStore(rootReducer, oldState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
