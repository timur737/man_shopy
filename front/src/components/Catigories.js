import React from 'react';
import { Link } from 'react-router-dom';

function Catigories({ items, onClickItem }) {
  return (
    <div className="categories">
      <ul className="categories__list">
        {items.map((item, i) => (
          <li
            // className={activeCategory === i ? 'active' : ''}
            onClick={() => onClickItem(i)}
            key={`${item} + ${i}`}>
            <Link to="/">{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catigories;
