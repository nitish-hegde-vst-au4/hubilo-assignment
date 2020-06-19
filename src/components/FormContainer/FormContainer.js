import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../FormInputs/Input';
import RadioOrCheckbox from '../FormInputs/RadioOrCheckbox';

const inputFields = {
  name: '',
  email: '',
  dob: '',
  portfolioLink: '',
  hobbies: '',
  gender: '',
  skills: '',
};
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const urlRegex = RegExp(
  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
);

const formErrors = { ...inputFields };

const FormContainer = ({ user, action }) => {
  const dispatch = useDispatch();
  const state = user ? { ...user } : { ...inputFields };
  const [userFields, setUserFields] = useState(state);
  const [formFields, setFormFields] = useState({
    formErrors: { ...inputFields },
    hobbiesOptions: ['Coding', 'Sketching', 'Designing'],
    genderOptions: ['Male', 'Female', 'Other'],
    skillsOptions: ['Programming', 'Development', 'Design', 'Testing'],
  });

  const handleFormError = (name, value) => {
    switch (name) {
      case 'name':
        formErrors.name =
          value.length < 3 ? 'Minimum 3 characters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'Invalid Email';
        break;
      case 'dob':
        const dob = new Date(value);
        const currentDate = Date.now();
        formErrors.dob =
          value === '' || dob > currentDate ? 'Enter a valid DOB' : '';
        break;
      case 'portfolioLink':
        formErrors.portfolioLink = urlRegex.test(value) ? '' : 'Invalid Link';
        break;
      case 'gender':
        formErrors.gender = value.length ? '' : 'Please choose a gender';
        break;
      case 'hobbies':
        formErrors.hobbies =
          value.length > 0 ? '' : 'Please choose atleast one hobby';
        break;
      case 'skills':
        formErrors.skills =
          value.length > 0 ? '' : 'Please choose atleast one skill';
        break;
      default:
        break;
    }
  };

  const handleCheckbox = (e) => {
    const { name, value } = e.target;
    const newSelection = value;
    let newSelectionArray;

    if (userFields[name].indexOf(newSelection) > -1) {
      newSelectionArray = userFields[name].filter((s) => s !== newSelection);
    } else {
      newSelectionArray = [...userFields[name], newSelection];
    }
    handleFormError(name, newSelectionArray);
    setUserFields({
      ...userFields,
      [name]: newSelectionArray,
    });
    // dispatch(setFieldChange({ name, value: newSelectionArray }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormError(name, value);
    setUserFields({ ...userFields, [name]: value });
    //dispatch(setFieldChange({ name, value }));
  };
  const formValid = ({ formFields: { formErrors }, userFields }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });
    // validate the form was filled out
    Object.values(userFields).forEach((val) => {
      val === '' && (valid = false);
    });

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let [name, value] of Object.entries(userFields)) {
      handleFormError(name, value);
    }

    setFormFields({
      ...formFields,
      formErrors,
    });

    if (formValid({ formFields, userFields })) {
      console.log(userFields);
      dispatch(action(userFields));
      setUserFields(inputFields);
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };
  return (
    <div className='container d-flex flex-column align-items-center w-100'>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          name='name'
          placeholder='Enter Name'
          onChange={handleChange}
          error={formFields.formErrors.name}
          value={userFields.name}
        />

        <Input
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={handleChange}
          error={formFields.formErrors.email}
          value={userFields.email}
        />

        <Input
          type='date'
          name='dob'
          placeholder='Enter date of birth'
          onChange={handleChange}
          error={formFields.formErrors.dob}
          value={userFields.dob}
        />
        <Input
          type='text'
          name='portfolioLink'
          placeholder='Enter portfolio link'
          onChange={handleChange}
          error={formFields.formErrors.portfolioLink}
          value={userFields.portfolioLink}
        />
        <div className='form-group'>
          <label className='d-block'>Gender</label>
          {formFields.genderOptions.map((gender) => (
            <RadioOrCheckbox
              key={gender}
              type='radio'
              name='gender'
              inline='form-check-inline'
              option={gender}
              onChange={handleChange}
              value={gender}
              checked={userFields.gender === gender}
            />
          ))}
          {formFields.formErrors.gender.length ? (
            <small className='d-block'>{formFields.formErrors.gender}</small>
          ) : null}
        </div>
        <div className='form-group'>
          <label className='d-block'>Hobbies</label>
          {formFields.hobbiesOptions.map((hobby) => (
            <RadioOrCheckbox
              key={hobby}
              type='checkbox'
              name='hobbies'
              onChange={handleCheckbox}
              error={formFields.formErrors.hobbies}
              option={hobby}
              value={hobby}
              checked={userFields.hobbies.indexOf(hobby) > -1}
            />
          ))}
          {formFields.formErrors.hobbies.length ? (
            <small className='d-block'>{formFields.formErrors.hobbies}</small>
          ) : null}
        </div>
        <div className='form-group'>
          <label className='d-block'>Skills</label>
          {formFields.skillsOptions.map((skill) => (
            <RadioOrCheckbox
              key={skill}
              type='checkbox'
              name='skills'
              onChange={handleCheckbox}
              error={formFields.formErrors.skills}
              option={skill}
              value={skill}
              checked={userFields.skills.indexOf(skill) > -1}
            />
          ))}
          {formFields.formErrors.skills.length ? (
            <small className='d-block'>{formFields.formErrors.skills}</small>
          ) : null}
        </div>
        <button className='d-block btn btn-success mx-auto' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
