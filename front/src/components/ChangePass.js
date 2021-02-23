import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  changePassword,
  changePasswordFailure,
  changePasswordSuccess,
} from '../redux/actions/user';

function ChangePass({ id }) {
  const { register, errors, handleSubmit, watch } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();
  const pass = React.useRef({});
  pass.current = watch('password', '');

  const onChangePassword = (values) => {
    const token = JSON.parse(localStorage.getItem('token'));
    dispatch(changePassword(values, id, token))
      .then(({ data }) => {
        dispatch(changePasswordSuccess(data));
        history.push('/account');
      })
      .catch((err) => {
        if (err.request) {
          dispatch(changePasswordFailure(JSON.parse(err.request.response)));
        }
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onChangePassword)}>
      <div className="form-control">
        <input
          placeholder="Введите ваш пароль"
          className="inp"
          name="old_password"
          type="password"
          ref={register({
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'Password should be at-least 6 characters.',
            },
          })}
        />
        {errors.old_password && <p className="error">{errors.old_password.message}</p>}
      </div>
      <div className="form-control">
        <input
          placeholder="Введите новый пароль"
          className="inp"
          name="password"
          type="password"
          ref={register({
            required: 'last_name is required.',
            minLength: {
              value: 8,
              message: 'Password should be at-least 6 characters.',
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div className="form-control">
        <input
          className="inp"
          name="password2"
          type="password"
          placeholder="Повторите пароль"
          ref={register({
            validate: (value) => value === pass.current || 'Пароли не совподают',
            required: 'last_name is required.',
            minLength: {
              value: 6,
              message: 'Password should be at-least 6 characters.',
            },
          })}
        />
        {errors.password2 && <p className="error">{errors.password2.message}</p>}
      </div>
      <button className="form__btn btn" type="submit">
        Сохранить
      </button>
    </form>
  );
}

export default ChangePass;
