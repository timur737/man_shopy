import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { CartItem } from '../components';
import { clearCart, removeCartItem, incrementCount, decrementCount } from '../redux/actions/cart';
import emptyCartImg from '../assets/img/empty-cart.png';

function Cart() {
  const { totalPrice, itemCount, items } = useSelector(({ cart }) => cart);

  const dispatch = useDispatch();

  const pizzas = Object.keys(items).map((key) => {
    return items[key];
  });

  const clearButtonCart = () => {
    const answer = window.confirm('Вы действительно хотите очистить корзину?');
    if (answer) {
      dispatch(clearCart());
    }
  };

  const onRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const incCount = (id) => {
    dispatch(incrementCount(id));
  };

  const decCount = (id) => {
    dispatch(decrementCount(id));
  };
  return (
    <div className="content">
      <div className="container container--cart">
        {itemCount ? (
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Корзина
              </h2>
              <div className="cart__clear">
                <span onClick={clearButtonCart}>Очистить корзину</span>
              </div>
            </div>
            <div className="content__items">
              {pizzas.map((pizza, i) => {
                return (
                  <CartItem
                    pizza={pizza.items[0]}
                    totalPrice={pizza.totalPrice}
                    totalCount={pizza.totalCount}
                    onRemove={onRemoveItem}
                    incCount={incCount}
                    decCount={decCount}
                    key={i}
                  />
                );
              })}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  Всего пицц: <b>{itemCount} шт.</b>
                </span>
                <span>
                  Сумма заказа: <b>{totalPrice} USD</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link to="/" className="button button--outline button--add go-back-btn">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L1 6.93015L6.86175 1"
                      stroke="#D3D3D3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Вернуться назад</span>
                </Link>
                <div className="btn btn-pay">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart cart--empty">
            <h2>Корзина пустая 😕</h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCartImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
