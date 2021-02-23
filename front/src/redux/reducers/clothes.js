const initialState = {
  items: [],
  isLoaded: false,
};

function clothes(state = initialState, action) {
  if (action.type === 'SET_CLOTHES') {
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

export default clothes;
