import React from 'react';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';

export const SignInForm = props => {
  const { isError } = props;
  return (
    <form
      className="SignInForms__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">Sign In</div>
      <div className='SignInForms__RegistrationForm__error-block'>{props.errorMessage}</div>
      <Input
        onChange={props.handleEmailChange}
        placeholder="Your email"
        type="text"
        isError={isError}
      />
      <Input
        onChange={props.handlePasswordChange}
        placeholder="Password"
        type="password"
        isError={isError}
      />
      <Button theme="gradient-img" NameBtn="Sign In" />
      <div className="transitionAccount">
        Do you have an account?{' '}
        <Link className='span' to={'/registration/sign-up'}>Sign Up</Link>
      </div>
    </form>
  );
};
