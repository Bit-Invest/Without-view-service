import React from 'react';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import './SignInForm.css';

export const SignInForm = props => {
  return (
    <div className="regBlock">
      <form className="RegistrationForm" onSubmit={props.handleSubmit}>
        <div className="title">Sign In</div>
        <Input
          onChange={props.handleEmailChange}
          placeholder="Your email"
          type="text"
        />
        <Input
          onChange={props.handlePasswordChange}
          placeholder="Password (min 6 characters)"
          type="password"
        />
        <div className="checkboxBlock">
          <Checkbox
            checked={props.checked}
            onChange={props.handleCheckboxChange}
          />
          <div>Remember me</div>
        </div>
        <button className="btn">Sign In</button>
        <div className="transitionAccount">
          Do you have an account? <span onClick={props.onClickSignUp}>Sign Up</span>
        </div>
      </form>
    </div>
  );
};
