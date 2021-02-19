import axios from 'axios';

const fetchPizzas = (category) => (dispatch) => {
  dispatch(setLoaded(false));
  axios
    .get(`http://157.230.208.125:8000/api/?category=${category == null ? '' : category}`)
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
