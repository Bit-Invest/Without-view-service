import React from 'react';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import './ResetPasswordForm.css';

export const ResetPasswordForm = props => {
  return (
    <div className="regBlock">
      <form className="RegistrationForm" onSubmit={props.handleSubmit}>
        <div className="title">Reset Your Password</div>
        <div>We’ll email you instructions to reset your password.</div>
        <Input
          onChange={props.handleEmailChange}
          placeholder="Your email"
          type="text"
        />
        <button className="btn">Send</button>
        <div className="transitionAccount" onClick={props.onClickSignIn}>
          Return to Sign In <span>Sign In</span>
        </div>
      </form>
      <img className="regFon" src="image/reg_fon.jpg" alt="" />
    </div>
  );
};
