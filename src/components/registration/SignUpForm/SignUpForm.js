import React from 'react';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import './SignUpForm.css';

export const SignUpForm = props => {
  return (
    <div className="regBlock">
      <form className="RegistrationForm" onSubmit={props.handleSubmit}>
        <div className="title">Sign Up</div>
        <Select onChange={this.handleSelectChange} />
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
          <div>
            I give my consent to process and store my personal data for the
            purpose of verifying my identity.
          </div>
        </div>
        <button className="btn">Sign Up</button>
        <div className="transitionAccount">
          Already have an account? <span>Sign In</span>
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
