import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { signUpUser, signUpUserSuccess, signUpUserFailure } from '../redux/actions/user';
import { Redirect, useHistory } from 'react-router-dom';
import { TabAuth } from '../components';

export default function SingUp() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { user, isAuth, loading, error } = useSelector(({ userReducer }) => userReducer);
  const history = useHistory();

  if (isAuth) {
    return <Redirect to="/account" />;
  }

  const onSubmit = (values) => {
    dispatch(signUpUser(values))
      .then(({ data }) => {
        localStorage.setItem('token', JSON.stringify(data.auth_token));
        dispatch(signUpUserSuccess(data));
        history.push('./account');
      })
      .catch((err) => {
        if (err.response) {
          dispatch(signUpUserFailure(err.response.data));
        } else if (err.request) {
          //
        } else {
          dispatch(signUpUserFailure(err.message));
        }
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
            name="first_name"
            placeholder="Имя"
            ref={register({ required: 'First_name is required.' })}
          />
          {errors.first_name && <p className="error"> {errors.first_name.message} </p>}
        </div>
        <div className="form-control">
          <input
            className="inp"
            type="text"
            name="last_name"
            placeholder="Фамилия"
            ref={register({ required: 'Last name is required' })}
          />
          {errors.last_name && <p className="error"> {errors.last_name.message} </p>}
        </div>
        <div className="form-control">
          <input
            className="inp"
            type="number"
            name="phone"
            placeholder="Телефон"
            ref={register({ required: 'Phone is required', pattern: '' })}
          />
          {errors.phone && <p className="error"> {errors.phone.message} </p>}
        </div>
        <div className="form-control">
          <input
            className="inp"
            type="email"
            name="email"
            placeholder="Email"
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.',
              },
            })}
          />
          {errors.email && <p className="error"> {errors.email.message} </p>}
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
          <button disabled={loading} className="form__btn btn" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
}
