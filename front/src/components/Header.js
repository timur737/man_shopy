import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.png';
import cartImg from '../assets/img/cart.png';
import searchImg from '../assets/img/search.png';

import { Catigories, LoginPopup } from '../components';
import { fetchPizzas } from '../redux/actions/pizzas';
import { setCategory } from '../redux/actions/filters';

function Header() {
  const { itemCount } = useSelector(({ cart }) => cart);
  const { category } = useSelector(({ filterReducer }) => filterReducer);
  const dispatch = useDispatch();

  const categoryNames = ['Мужские', 'Женские', 'Детские'];

  React.useEffect(() => {
    dispatch(fetchPizzas(category));
    // eslint-disable-next-line
  }, [category]);

  function onSelectCategory(index) {
    dispatch(setCategory(index));
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav__logo" onClick={() => onSelectCategory(null)}>
            <img src={logo} alt="" />
          </Link>

          <Catigories
            onClickItem={onSelectCategory}
            items={categoryNames}
            activeCategory={category}
          />

          <div className="nav__control">
            <button className="search-button">
              <img src={searchImg} alt="" />
            </button>
            <Link to="/cart" className="cart-button">
              <img src={cartImg} alt="" />
              <span className="cart-count">{itemCount}</span>
            </Link>
            <LoginPopup />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
