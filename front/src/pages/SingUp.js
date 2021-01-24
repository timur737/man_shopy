import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { signUpUser, signUpUserSuccess, signUpUserFailure } from '../redux/actions/user';
import { useHistory } from 'react-router-dom';
import { TabAuth } from '../components';

export default function SingUp() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  // const { error, isAuth, loading } = useSelector(({ userReducer }) => userReducer);

  const history = useHistory();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(signUpUser(values))
      .then(({ data }) => {
        localStorage.setItem('token', JSON.stringify(data.auth_token));
        dispatch(signUpUserSuccess(data));
        history.push('./account');
      })
      .catch((error) => {
        dispatch(signUpUserFailure(error.message));
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
          <button className="form__btn btn" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
      {/* 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            name="username"
            ref={register({ required: 'Username is required.' })}
          />
          <div className="form-control">
            {errors.username && <p className="error"> {errors.username.message} </p>}
          </div>
          <label>Фамилия</label>
          <input
            type="text"
            name="last_name"
            ref={register({ required: 'last_name is required.' })}
          />
          {errors.last_name && <p className="error"> {errors.last_name.message} </p>}
        </div>
        <div className="form-control ">
          <label>Email</label>
          <input
            type="text"
            name="email"
            ref={register({
              required: 'Email is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.',
              },
            })}
          />
          {errors.email && <p className="error"> {errors.email.message} </p>}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            ref={register({
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password should be at-least 6 characters.',
              },
            })}
          />
          {errors.password && <p className="error"> {errors.password.message} </p>}
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Регистрация</button>
        </div>
      </form> */}
    </div>
  );
}
