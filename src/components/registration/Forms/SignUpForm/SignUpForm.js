import React from 'react';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import { Button } from '@registration/Forms/Button';
import './SignUpForm.css';

export const SignUpForm = props => {
  return (
    <form
      className="SignUpForms__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">Sign Up</div>
      <Select onChange={this.handleSelectChange} />
      <Input
        onChange={this.handleEmailChange}
        placeholder="Your email"
        type="text"
        required
      />
      <Input
        onChange={this.handlePasswordChange}
        placeholder="Password (min 6 characters)"
        type="password"
        required
      />
      <div className="checkboxBlock">
        <Checkbox
          checked={props.checked}
          onChange={props.handleCheckboxChange}
        />
        <div>
          I give my consent to process and store my personal data for the
          purpose of verifying my identity.
          <div className="required">* Required</div>
        </div>
      </div>
      <Button />
      {/*<button className="btn"><div className="btn-title">Sign Up</div><div className="btn-image"></div></button>*/}
      <div className="transitionAccount">
        Already have an account?{' '}
        <span onClick={props.onClickSignIn}>Sign In</span>
      </div>
    </form>
  );
};
