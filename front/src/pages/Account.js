import React from 'react';
import { useSelector } from 'react-redux';

export default function Account() {
  const { loading, user } = useSelector(({ userReducer }) => userReducer);
  return (
    <div className="container">
      <h3 style={{ marginBottom: '20px' }}> Личный кабинет </h3>
      {!loading ? (
        <div>
          <div className="account">
            <p>Имя</p>
            <div className="inp"> {user.first_name} </div>
            <p>Фамилия</p>
            <div className="inp"> {user.last_name} </div>
            <p>Телефон</p>
            <div className="inp"> {user.phone} </div>
            <p>Email</p>
            <div className="inp"> {user.email} </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
