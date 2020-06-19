import React from 'react';
import './Input.css';
const Input = ({ error, ...otherProps }) => {
  return (
    <div className='form-group'>
      <input
        className={`form-control ${error ? 'outline-danger' : ''}`}
        {...otherProps}
      />
      <small className='d-block'>{error}</small>
    </div>
  );
};

export default Input;
