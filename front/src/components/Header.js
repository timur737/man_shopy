import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.png';
import cartImg from '../assets/img/cart.png';

import { Catigories, LoginPopup } from '../components';
import { setCategory } from '../redux/actions/filters';
import { fetchClothes } from '../redux/actions/clothes';

function Header() {
  const { itemCount } = useSelector(({ cart }) => cart);
  const { category, categoryNames } = useSelector(({ filterReducer }) => filterReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchClothes(category));
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
            // activeCategory={category}
          />

          <div className="nav__control">
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
