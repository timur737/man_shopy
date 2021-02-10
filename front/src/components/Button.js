import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Button({ onClick, className, children, outline }) {
  return (
    <button onClick={onClick} className={classNames(className, { 'button--outline': outline })}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Button;
