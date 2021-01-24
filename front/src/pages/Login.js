import React from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { loginUser, loginUserFailure, loginUserSuccess } from '../redux/actions/user';
import { useHistory } from 'react-router-dom';
import { TabAuth } from '../components';

function Login() {
  // const { error, isAuth, loading } = useSelector(({ userReducer }) => userReducer);
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
        dispatch(loginUserFailure(err.message));
      });
  };

  return (
    <div className="container">
      <TabAuth />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <input
            className="inp"
            type="text"
            name="username"
            placeholder="Имя"
            ref={register({ required: 'Username is required.' })}
          />
          {errors.username && <p className="error"> {errors.username.message} </p>}
        </div>

        <div className="form-control">
          <input
            className="inp"
            type="password"
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
          <button style={{ marginRight: '30px' }} className="form__btn btn" type="submit">
            Войти
          </button>
          <a style={{ textDecoration: 'underline' }} href="/">
            Забыли пароль?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
