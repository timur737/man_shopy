import React from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';

import { Block } from '../components';

import { addCartClothes } from '../redux/actions/cart';

function Home() {
  const dispatch = useDispatch();

  const { items, isLoaded } = useSelector(({ clothesReducer }) => {
    return { items: clothesReducer.items, isLoaded: clothesReducer.isLoaded };
  });

  const { category, categoryNames } = useSelector(({ filterReducer }) => filterReducer);
  const cartItems = useSelector(({ cart }) => cart.items);

  function loadedBlock(key) {
    return (
      <ContentLoader
        key={key}
        speed={2}
        width={280}
        height={410}
        viewBox="0 0 280 410"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="0" y="280" rx="3" ry="3" width="280" height="30" />
        <rect x="1" y="336" rx="3" ry="3" width="76" height="44" />
        <rect x="114" y="338" rx="3" ry="3" width="161" height="43" />
        <rect x="0" y="0" rx="3" ry="3" width="280" height="260" />
      </ContentLoader>
    );
  }

  function addClothesToCart(obj) {
    dispatch(addCartClothes(obj));
  }

  return (
    <div className="container">
      {category === null ? (
        <div className="content__main">
          <div className="content__body">
            <h1 className="content__title">
              NEW <br /> Collection
            </h1>
          </div>
        </div>
      ) : (
        ''
      )}
      <h2 className="content__subtitle">
        {!categoryNames[category] ? 'Ассортимент' : categoryNames[category]}
      </h2>

      <div className="content__items">
        {isLoaded
          ? items.map((item) => (
              <Block
                onAddClothes={addClothesToCart}
                addedCount={cartItems[item.id] && cartItems[item.id].items.length}
                key={item.id}
                {...item}
              />
            ))
          : Array(4)
              .fill(0)
              .map((_, index) => loadedBlock(index))}
      </div>
    </div>
  );
}

export default Home;
