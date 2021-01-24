import React from 'react';
import { Button } from '.';

function PizzaBlock({ id, title, price, img, onAddPizza, addedCount }) {
  const handlePizza = () => {
    const obj = {
      id,
      title,
      img,
      price,
    };

    onAddPizza(obj);
  };

  return (
    <div className="block">
      <img className="block__image" src={img} alt="Pizza" />
      <h4 className="block__title">{title}</h4>
      <div className="block__bottom">
        <div className="block__price">{price} USD</div>
        <Button onClick={handlePizza} className="btn1">
          <span> В корзину</span>
          {addedCount && <i>{addedCount}</i>}
        </Button>
      </div>
    </div>
  );
}

export default PizzaBlock;
