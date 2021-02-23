import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { loginUser, loginUserFailure, loginUserSuccess } from '../redux/actions/user';
import { TabAuth } from '../components';

function Login() {
  const { isAuth, loading, error } = useSelector(({ userReducer }) => userReducer);
  const { register, errors, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values) => {
    dispatch(loginUser(values))
      .then(({ data }) => {
        localStorage.setItem('token', JSON.stringify(data.auth_token));
        dispatch(loginUserSuccess(data));
        history.push('/account');
      })
      .catch((err) => {
        if (err.response) {
          dispatch(loginUserFailure(err.response.data));
        } else if (err.request) {
          //
        } else {
          dispatch(loginUserFailure(err.message));
        }
      });
  };

  if (isAuth) {
    return <Redirect to="/account" />;
  }

  return (
    <div>
      <div className="container">
        <TabAuth />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <input
              className="inp"
              type="email"
              name="username"
              placeholder="Email"
              ref={register({
                required: 'Email is required.',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Email is not valid.',
                },
              })}
            />
            {errors.username && <p className="error"> {errors.username.message} </p>}
          </div>

          <div className="form-control">
            <input
              type="password"
              className="inp"
              name="password"
              placeholder="Пароль"
              ref={register({
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should be at-least 6 characters.',
                },
              })}
            />
            {errors.password && <p className="error"> {errors.password.message} </p>}
          </div>

          <div className="form-control">
            <button
              disabled={loading}
              style={{ marginRight: '30px' }}
              className="form__btn btn"
              type="submit">
              Войти
            </button>
            <a href="#" style={{ textDecoration: 'underline' }} href="/">
              Забыли пароль?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
