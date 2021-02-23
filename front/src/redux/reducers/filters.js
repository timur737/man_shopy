const initialState = {
  category: null,
  categoryNames: ['Мужские', 'Женские', 'Детские'],
};

function filters(state = initialState, action) {
  if (action.type === 'SET_CATEGORY') {
    return {
      ...state,
      category: action.payload,
    };
  }

  return state;
}

export default filters;
