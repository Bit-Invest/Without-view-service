import React from 'react';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import './SignInForm.css';

export const SignInForm = props => {
  return (
    <form
      className="SignInForms__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">Sign In</div>
      <Input
        onChange={props.HandleEmailChange}
        placeholder="Your email"
        type="text"
      />
      <Input
        onChange={props.HandlePasswordlChange}
        placeholder="Password (min 6 characters)"
        type="password"
      />
      <div className="checkboxBlock">
        <Checkbox
          checked={props.state.checked}
          onChange={props.handleCheckboxChange}
        />
        <div>Remember me</div>
      </div>
      <button className="btn">Sign In</button>
      <div className="transitionAccount">
        Do you have an account? <span>Sign Up</span>
      </div>
    </form>
  );
};
