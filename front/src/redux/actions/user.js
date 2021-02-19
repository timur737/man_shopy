import axios from 'axios';
const url = 'http://157.230.208.125:8000';

export const signUpUser = (user) => (dispatch) => {
  dispatch(signUpUserStarted());

  return axios.post(`${url}/auth/users/`, user);
};

const signUpUserStarted = () => ({
  type: 'SIGNUP_USER',
});

export const signUpUserSuccess = (user) => ({
  type: 'SIGNUP_USER_SUCCESS',
  payload: user,
});

export const signUpUserFailure = (error) => ({
  type: 'SIGNUP_USER_FAILURE',
  payload: error,
});

export const meFromToken = (tokenFromStorage) => (dispatch) => {
  dispatch(meFromTokenStarted());

  return axios.get(`${url}/auth/users/me/`, {
    headers: { Authorization: `Token ${tokenFromStorage}` },
  });
};

const meFromTokenStarted = () => ({
  type: 'ME_FROM_TOKEN',
});

export const meFromTokenSuccess = (user) => ({
  type: 'ME_FROM_TOKEN_SUCCESS',
  payload: user,
});

export const meFromTokenFailure = (error) => ({
  type: 'ME_FROM_TOKEN_FAILURE',
  payload: error,
});

export const loginUser = (user) => (dispatch) => {
  dispatch(loginUserStarted());
  return axios.post(`${url}/login/`, user);
};

const loginUserStarted = () => ({
  type: 'LOGIN_USER',
});

export const loginUserSuccess = (user) => ({
  type: 'LOGIN_USER_SUCCESS',
  payload: user,
});

export const loginUserFailure = (error) => ({
  type: 'LOGIN_USER_FAILURE',
  payload: error,
});

export const editUser = (user, id, token) => (dispatch) => {
  dispatch(editUserStarted());
  return axios.put(
    `${url}/update-profile/${id}/`,
    {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
    },
    {
      headers: { Authorization: `Token ${token}` },
    },
  );
};

const editUserStarted = () => ({
  type: 'EDIT_USER',
});

export const editUserSuccess = (user) => ({
  type: 'EDIT_USER_SUCCESS',
  payload: user,
});

export const editUserFailure = (error) => ({
  type: 'EDIT_USER_FAILURE',
  payload: error,
});

export const changePassword = (user, id, token) => (dispatch) => {
  dispatch(changePasswordStarted());

  return axios.put(
    `${url}/change-password/${id}/`,
    {
      old_password: user.old_password,
      password: user.password,
      password2: user.password2,
    },
    {
      headers: { Authorization: `Token ${token}` },
    },
  );
};

const changePasswordStarted = (data) => ({
  type: 'CHANGE_PASS',
});

export const changePasswordSuccess = () => ({
  type: 'CHANGE_PASS_SUCCESS',
});

export const changePasswordFailure = (error) => ({
  type: 'CHANGE_PASS_FAILURE',
  payload: error,
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});
