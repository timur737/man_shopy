import React from 'react';
import { Link } from 'react-router-dom';

const TabAuth = () => {
  return (
    <div className="auth-tab">
      <Link className="auth-tab__link" to="/signup">
        Регистрация
      </Link>
      <Link className="auth-tab__link" to="/login">
        Авторизация
      </Link>
    </div>
  );
};

export default TabAuth;
