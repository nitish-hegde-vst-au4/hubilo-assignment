import React from 'react';
import './Modal.css';

const Modal = ({ component: Component, ...props }) => {
  return (
    <div className='modal-container'>
      <h2 className='text-center'>Edit User</h2>
      <Component {...props} />
    </div>
  );
};

export default Modal;
