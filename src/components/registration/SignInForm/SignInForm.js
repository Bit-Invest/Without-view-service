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
          onChange={this.HandleEmailChange}
          placeholder="Your email"
          type="text"
        />
        <Input
          onChange={this.HandlePasswordlChange}
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
        <div className="infoHref">
          © 2018 CryptoActive | <span>Privacy Policy</span> &{' '}
          <span>Terms of Service</span>
        </div>
      </form>
      <img className="regFon" src="image/reg_fon.jpg" alt="" />
    </div>
  );
};
