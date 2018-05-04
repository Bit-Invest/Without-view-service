import React from 'react';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import { Button } from '@components/common/Button';

export const SignInForm = props => {
  const { isError } = props;
  return (
    <form
      className="SignInForms__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">Sign In</div>
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
        needForgot
        isError={isError}
      />
      <div className="checkboxBlock">
        <Checkbox
          checked={props.checked}
          onChange={props.handleCheckboxChange}
        />
        <div>Remember me</div>
      </div>
      <Button theme="gradient-img" NameBtn="Sign In" />
      <div className="transitionAccount">
        Do you have an account?{' '}
        <span onClick={props.onClickSignUp}>Sign Up</span>
      </div>
    </form>
  );
};
