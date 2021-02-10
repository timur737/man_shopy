const initialState = {
  items: [],
  isLoaded: false,
};

function pizzas(state = initialState, action) {
  if (action.type === 'SET_PIZZAS') {
    return {
      ...state,
      items: action.payload,
      isLoaded: true,
    };
  }

  if (action.type === 'SET_LOADED') {
    return {
      ...state,
      isLoaded: action.payload,
    };
  }

  return state;
}

export default pizzas;
