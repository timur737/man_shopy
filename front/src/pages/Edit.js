import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

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
        dispatch(editUserFailure(err.message));
      });
  };

  return (
    <div className="container">
      <h3 style={{ marginBottom: '20px' }}>Редактировать</h3>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-50px',
            top: '50%',
            marginTop: '-50px',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Loader visible={true} type="ThreeDots" color="#000" height={150} width={150} />
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <input
                  className="inp"
                  type="text"
                  name="first_name"
                  placeholder="Имя"
                  defaultValue={user.first_name}
                  ref={register({ required: 'Username is required.' })}
                />
                {errors.first_name && <p className="error"> {errors.first_name.message} </p>}
              </div>
              <div className="form-control">
                <input
                  className="inp"
                  type="number"
                  name="phone"
                  placeholder="Телефон"
                  defaultValue={user.phone}
                  ref={register({ required: 'Phone is required.' })}
                />
                {errors.phone && <p className="error"> {errors.phone.message} </p>}
              </div>
              <div className="form-control">
                <input
                  className="inp"
                  type="text"
                  name="last_name"
                  defaultValue={user.last_name}
                  ref={register({ required: 'last_name is required.' })}
                />
                {errors.last_name && <p className="error"> {errors.last_name.message} </p>}
              </div>
              <div className="form-control">
                <input
                  className="inp"
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
                <button className="form__btn btn" type="submit">
                  Сохранить
                </button>
              </div>
            </form>
            <ChangePass id={user.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
