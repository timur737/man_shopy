import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../redux/actions/pizzas';

const fetch = () => {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector(({ filterReducer }) => filterReducer);
  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));

    // eslint-disable-next-line
  }, [sortBy, category]);
};

export default Fetch1;
