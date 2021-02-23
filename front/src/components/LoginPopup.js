import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import personalAreaImg from '../assets/img/login.png';
import { logoutUser, loginUser, loginUserFailure, loginUserSuccess } from '../redux/actions/user';

function LoginPopup() {
  const { isAuth, loading } = useSelector(({ userReducer }) => userReducer);
  const [visiblePopup, setVisiblePopup] = React.useState(false);

  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSumbit = (values) => {
    dispatch(loginUser(values))
      .then(({ data }) => {
        localStorage.setItem('token', JSON.stringify(data.auth_token));
        dispatch(loginUserSuccess(data));
        setVisiblePopup(false);
        setVisiblePopup(!visiblePopup);
        history.push('/account');
      })
      .catch((err) => {
        if (err.request) {
          dispatch(loginUserFailure(JSON.parse(err.request.response)));
          setVisiblePopup(false);
          setVisiblePopup(!visiblePopup);
          history.push('/login');
        }
      });
  };

  const logoutButton = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    setVisiblePopup(false);
    history.push('/login');
  };

  const loginRef = React.useRef();

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleOutsideClick = (event) => {
    if (!event.path.includes(loginRef.current)) {
      setVisiblePopup(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="personal" ref={loginRef}>
      <button onClick={toggleVisiblePopup} className="login-button">
        <img src={personalAreaImg} alt="img-login" />
      </button>
      {visiblePopup ? (
        <div className="popup">
          {isAuth ? (
            <div className="popup__list">
              <div>
                <Link onClick={() => setVisiblePopup(!visiblePopup)} to="/account">
                  Личный кабинет
                </Link>
              </div>
              <div>
                <Link onClick={() => setVisiblePopup(!visiblePopup)} to="/edit">
                  Редактировать
                </Link>
              </div>
              <div>
                <button className="btn form__btn" onClick={logoutButton}>
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <div className="popup__list">
              <form className="" onSubmit={handleSubmit(onSumbit)}>
                <div className="form-control">
                  <label>Email</label>
                  <input
                    className="inp"
                    type="email"
                    name="username"
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
                  <label>Password</label>
                  <input
                    className="inp"
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
                  <button disabled={loading} className="btn form__btn" type="submit">
                    Войти
                  </button>
                </div>
              </form>
              <p>
                Впервые у нас?{' '}
                <Link onClick={() => setVisiblePopup(!visiblePopup)} to="/signup">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default LoginPopup;
