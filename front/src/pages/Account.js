import React from 'react';
import { useSelector } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';

export default function Account() {
  const { loading, user } = useSelector(({ userReducer }) => userReducer);

  // if (!isAuth) return <Redirect to="/" />;

  return (
    <div className="container">
      <p style={{ marginBottom: '20px' }}> Личный кабинет </p>
      {!loading ? (
        <div>
          <div>
            <p>Имя</p>
            <p className="border"> {user.username} </p>
            <p>Фамилия</p>
            <p className="border"> {user.last_name} </p>
            <p>Email</p>
            <p className="border"> {user.email} </p>
          </div>
          {/* <div>
            <h3>Корзина</h3>
          </div> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
