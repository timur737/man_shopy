const initialState = {
  items: {},
  totalPrice: 0,
  itemCount: 0,
};

function cart(state = initialState, action) {
  function getTotalPrice(arr) {
    return arr.reduce((sum, obj) => obj.price + sum, 0);
  }

  switch (action.type) {
    case 'ADD_PIZZAS': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
          totalCount: currentPizzaItems.length,
        },
      };
      const totalArr = [].concat.apply(
        [],
        Object.values(newItems).map((obj) => obj.items),
      );

      return {
        ...state,
        items: newItems,
        itemCount: totalArr.length,
        totalPrice: getTotalPrice(totalArr),
      };
    }

    case 'CLEAR_CART':
      return {
        items: {},
        itemCount: 0,
        totalPrice: 0,
      };

    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items,
      };

      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].totalCount;

      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        itemCount: state.itemCount - currentTotalCount,
      };
    }
    case 'INCREMENT': {
      const newItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];

      const newObj = {
        ...state.items,
        [action.payload]: {
          items: newItems,
          totalPrice: getTotalPrice(newItems),
          totalCount: newItems.length,
        },
      };

      const totalArr = [].concat.apply(
        [],
        Object.values(newObj).map((obj) => obj.items),
      );

      return {
        ...state,
        items: newObj,
        totalPrice: getTotalPrice(totalArr),
        itemCount: totalArr.length,
      };
    }

    case 'DECREMENT': {
      const oldItems = state.items[action.payload].items;

      const newItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;

      const newObj = {
        ...state.items,
        [action.payload]: {
          items: newItems,
          totalPrice: newItems.reduce((sum, obj) => obj.price + sum, 0),
          totalCount: newItems.length,
        },
      };

      const totalArr = [].concat.apply(
        [],
        Object.values(newObj).map((obj) => obj.items),
      );

      return {
        ...state,
        items: newObj,
        totalPrice: getTotalPrice(totalArr),
        itemCount: totalArr.length,
      };
    }

    default:
      return state;
  }
}

export default cart;
