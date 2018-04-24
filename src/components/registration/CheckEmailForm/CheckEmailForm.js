import React from 'react';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import './CheckEmailForm.css';

export const CheckEmailForm = props => {
  return (
    <div className="regBlock">
      <form className="RegistrationForm" onSubmit={props.handleSubmit}>
        <div className="title">Please, check your email</div>
        <div>We have sent you instructions to reset your password.</div>
        <div className="transitionAccount">
          Return to <span>Sign In</span>
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
