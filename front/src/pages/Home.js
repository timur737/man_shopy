import React from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';

import { Block, SortPopup } from '../components';
// import { setSortBy } from '../redux/actions/filters';
// import { fetchPizzas } from '../redux/actions/pizzas';
import { addCartPizza } from '../redux/actions/cart';

// const sortItem = [
//   { name: 'цене', type: 'price' },
//   { name: 'алфавиту', type: 'title' },
// ];

function Home() {
  const dispatch = useDispatch();

  const { items, isLoaded } = useSelector(({ pizzasReducer }) => {
    return { items: pizzasReducer.items, isLoaded: pizzasReducer.isLoaded };
  });

  const { category } = useSelector(({ filterReducer }) => filterReducer);
  const cartItems = useSelector(({ cart }) => cart.items);
  const categoryNames = ['Мужские', 'Женские', 'Детские'];

  // React.useEffect(() => {
  //   dispatch(fetchPizzas(sortBy));
  //   // eslint-disable-next-line
  // }, [sortBy]);

  // function onSelectSortBy(type) {
  //   dispatch(setSortBy(type));
  // }

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

  function addPizzaToCart(obj) {
    dispatch(addCartPizza(obj));
  }

  return (
    <div className="container">
      <div className="content__top">
        {/* <SortPopup onClickSortBy={onSelectSortBy} items={sortItem} sortBy={sortBy} /> */}
      </div>

      {category === null ? (
        <div className="content__main">
          <div className="content__body">
            <h1 className="content__title">
              L!VE <br /> Collection
            </h1>
            <button className="btn1">Shop Men</button>
            <button className="btn1">Shop women</button>
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
                onAddPizza={addPizzaToCart}
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
