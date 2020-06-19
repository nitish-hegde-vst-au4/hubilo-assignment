import React from 'react';
import { useSelector } from 'react-redux';
import { addUser } from '../../redux/actions';
import FormContainer from '../FormContainer/FormContainer';
const FormPage = () => {
  const error = useSelector((state) => state.error);
  return (
    <div className='container'>
      <h1 className='text-center mb-2'>User form</h1>
      <h3 className='text-center mb-2'>{error}</h3>
      <FormContainer action={addUser} />
    </div>
  );
};

export default FormPage;
