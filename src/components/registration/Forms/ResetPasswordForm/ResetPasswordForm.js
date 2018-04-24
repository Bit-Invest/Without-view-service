import React from 'react';
import { Input } from '@registration/input';
import './ResetPasswordForm.css';

export const ResetPasswordForm = props => {
  return (
    <form
      className="Reset-password__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">Reset Your Password</div>
      <div className="success">
        We’ll email you instructions to reset your password.
      </div>
      <Input
        onChange={props.HandleEmailChange}
        placeholder="Your email"
        type="text"
      />
      <button className="btn">Send</button>
      <div className="transitionAccount">
        Return to Sign In <span>Sign In</span>
      </div>
    </form>
  );
};
