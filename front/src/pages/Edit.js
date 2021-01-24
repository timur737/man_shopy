import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { editUser, editUserFailure, editUserSuccess } from '../redux/actions/user';
import { ChangePass } from '../components';

function Edit() {
  const { loading, user } = useSelector(({ userReducer }) => userReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (values) => {
    const token = JSON.parse(localStorage.getItem('token'));
    dispatch(editUser(values, user.id, token))
      .then(({ data }) => {
        dispatch(editUserSuccess(data));
        history.push('/account');
      })
      .catch((err) => {
        // if()
        dispatch(editUserFailure(err.message));
      });
  };

  return (
    <div className="container">
      <h3 style={{ marginBottom: '20px' }}>Редоктировать </h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: 'flex' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label>Username</label>
              <input
                type="text"
                name="username"
                defaultValue={user.username}
                ref={register({ required: 'Username is required.' })}
              />
              <div className="form-control">
                {errors.username && <p className="error"> {errors.username.message} </p>}
              </div>
              <label>Фамилия</label>
              <input
                type="text"
                name="last_name"
                defaultValue={user.last_name}
                ref={register({ required: 'last_name is required.' })}
              />
              {errors.last_name && <p className="error"> {errors.last_name.message} </p>}
            </div>
            <div className="form-control">
              <label>Email</label>
              <input
                type="text"
                name="email"
                defaultValue={user.email}
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
              <button type="submit">Сохранить</button>
            </div>
          </form>

          <ChangePass id={user.id} />
        </div>
      )}
    </div>
  );
}

export default Edit;
