import React from 'react';
import { Link } from 'react-router-dom';

const TabAuth = () => {
  const toggleClassBtn = (event) => {
    console.log(event.target);
    // document.querySelectorAll('.auth-tab__link').forEach()

    // event.target.classList.toggle('active');
  };

  return (
    <div className="auth-tab">
      <Link onClick={toggleClassBtn} className="auth-tab__link active" to="/signup">
        Регистрация
      </Link>
      <Link onClick={toggleClassBtn} className="auth-tab__link" to="/login">
        Авторизация
      </Link>
    </div>
  );
};

export default TabAuth;
