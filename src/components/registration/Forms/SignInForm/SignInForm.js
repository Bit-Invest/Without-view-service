import React from 'react';
import { Input } from '@registration/input';
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
        onChange={props.handleEnter}
        placeholder="Your email"
        type="text"
        isError={isError}
        name="email"
      />
      <Input
        onChange={props.handleEnter}
        placeholder="Password"
        type="password"
        isError={isError}
        name="password"
      />
      <Button theme="gradient-img" NameBtn="Sign In" />
      <div className="transitionAccount">
        Do you have an account?{' '}
        <Link className='span' to={'/registration/sign-up'}>Sign Up</Link>
      </div>
    </form>
  );
};
