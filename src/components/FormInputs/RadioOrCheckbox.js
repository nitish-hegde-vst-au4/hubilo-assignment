import React from 'react';

const RadioOrCheckbox = (props) => {
  return (
    <div className='form-check form-check-inline'>
      <input className='form-check-input' {...props} />
      <label className='form-check-label'>{props.option}</label>
    </div>
  );
};

export default RadioOrCheckbox;
