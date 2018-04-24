import React from 'react';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import './CheckEmailForm.css';

export const CheckEmailForm = props => {
  return (
    <div className="regBlock">
      <form className="RegistrationForm">
        <div className="title">Please, check your email</div>
        <div>We have sent you instructions to reset your password.</div>
        <div className="transitionAccount" onClick={props.onClickSignIn}>
          Return to <span>Sign In</span>
        </div>
      </form>
      <img className="regFon" src="image/reg_fon.jpg" alt="" />
    </div>
  );
};
