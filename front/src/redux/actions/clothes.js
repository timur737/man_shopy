import axios from 'axios';

const fetchClothes = (category) => (dispatch) => {
  dispatch(setLoaded(false));
  axios
    .get(`http://157.230.208.125:8000/api/?category=${category == null ? '' : category}`)
    .then(({ data }) => {
      dispatch(setClothes(data.results));
    });
};

const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

const setClothes = (items) => ({
  type: 'SET_CLOTHES',
  payload: items,
});

export { setClothes, fetchClothes };
