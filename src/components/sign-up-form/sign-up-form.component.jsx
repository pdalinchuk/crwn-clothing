import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles.jsx';

import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already on use');
      } else console.log(err);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          onChange={handleChange}
          name='displayName'
          value={displayName}
          required
        />

        <FormInput
          label='Email'
          type='email'
          onChange={handleChange}
          name='email'
          value={email}
          required
        />

        <FormInput
          label='Password'
          type='password'
          onChange={handleChange}
          name='password'
          value={password}
          required
        />

        <FormInput
          label='Confirm Password'
          type='password'
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
          required
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type='submit'>
          Sign up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
