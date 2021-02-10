import axios from 'axios';

const fetchPizzas = (category) => (dispatch) => {
  dispatch(setLoaded(false));
  axios
    .get(`https://74cc97f30d42.ngrok.io/api/?category=${category == null ? '' : category}`)
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
