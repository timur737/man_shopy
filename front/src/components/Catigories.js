import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Catigories({ activeCategory, items, onClickItem }) {
  return (
    <div className="categories">
      <ul className="categories__list">
        {items.map((item, i) => (
          <li
            className={activeCategory === i ? 'active' : ''}
            onClick={() => onClickItem(i)}
            key={`${item} + ${i}`}>
            <Link to="/">{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

Catigories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Catigories;
