import React from 'react';
import { Button } from '.';

function Block({ id, title, price, img, onAddClothes, addedCount }) {
  const handleClothes = () => {
    const obj = {
      id,
      title,
      img,
      price,
    };

    onAddClothes(obj);
  };

  return (
    <div className="block">
      <img className="block__image" src={img} alt="Clothes" />
      <h4 className="block__title">{title}</h4>
      <div className="block__bottom">
        <div className="block__price">{price} USD</div>
        <Button onClick={handleClothes} className="btn1">
          <span> В корзину</span>
          {addedCount && <i>{addedCount}</i>}
        </Button>
      </div>
    </div>
  );
}

export default Block;
