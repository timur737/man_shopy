import axios from 'axios';

const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  axios
    .get(
      `https://jastegri.pythonanywhere.com/api/?category=${
        category == null ? '' : category
      }&order=${sortBy}`,
    )
    .then(({ data }) => {
      dispatch(setPizzas(data.results));
    });
};

const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});

export { setPizzas, fetchPizzas };
