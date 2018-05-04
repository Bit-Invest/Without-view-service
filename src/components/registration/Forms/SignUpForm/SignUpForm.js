import React from 'react';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import { Button } from '@components/common/Button';

export const SignUpForm = props => {
  const { isError } = props;
  return (
    <form
      className="SignUpForms__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">Sign Up</div>
      <Select
        onChange={this.handleSelectChange}
        NameSelect1='Trader'
        NameSelect2='Investor'
      />
      <Input
        onChange={this.handleEmailChange}
        placeholder="Your email"
        type="text"
        required
        isError={isError}
      />
      <Input
        onChange={this.handlePasswordChange}
        placeholder="Password (min 6 characters)"
        type="password"
        required
        isError={isError}
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
      <Button theme="gradient-img" NameBtn="Sign Up" />
      <div className="transitionAccount">
        Already have an account?{' '}
        <span onClick={props.onClickSignIn}>Sign In</span>
      </div>
    </form>
  );
};
