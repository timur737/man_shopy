import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import personalAreaImg from '../assets/img/login.png';
import { logoutUser, loginUser, loginUserFailure, loginUserSuccess } from '../redux/actions/user';

function LoginPopup() {
  const { isAuth } = useSelector(({ userReducer }) => userReducer);
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
        history.push('/account');
      })
      .catch((err) => {
        dispatch(loginUserFailure(err.message));
      });
  };

  const logoutButton = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    setVisiblePopup(false);
    history.push('/signup');
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
              <Link to="/account">Личный кабинет</Link>
              <Link to="/edit">Редоктировать</Link>
              <button onClick={logoutButton}> Выйти </button>
            </div>
          ) : (
            <div className="popup__list">
              <form className="" onSubmit={handleSubmit(onSumbit)}>
                <div className="form-control">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    ref={register({
                      required: 'Username is required.',
                    })}
                  />
                  {errors.username && <p className="error"> {errors.username.message} </p>}
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
                  <button type="submit">Войти</button>
                </div>
              </form>
              <p>
                Впервые у нас? <Link to="/signup">Зарегистрироваться</Link>
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
