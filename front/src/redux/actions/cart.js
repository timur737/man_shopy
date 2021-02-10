function addCartPizza(pizzaObj) {
  return {
    type: 'ADD_PIZZAS',
    payload: pizzaObj,
  };
}

function clearCart() {
  return {
    type: 'CLEAR_CART',
  };
}

function removeCartItem(id) {
  return {
    type: 'REMOVE_CART_ITEM',
    payload: id,
  };
}

function incrementCount(id) {
  return {
    type: 'INCREMENT',
    payload: id,
  };
}

function decrementCount(id) {
  return {
    type: 'DECREMENT',
    payload: id,
  };
}

export { addCartPizza, clearCart, removeCartItem, incrementCount, decrementCount };
