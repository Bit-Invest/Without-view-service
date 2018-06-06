import React from 'react';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { Checkbox } from '@registration/checkbox';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';

export const SignUpForm = props => {
  const { isError } = props;
  return (
    <form
      className="SignUpForms__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">Sign Up</div>
      <Select
        onChange={props.handleSelectChange}
        options={[
          {
            value: 'trader',
            label: 'Trader'
          },
          {
            value: 'investor',
            label: 'Investor'
          }
        ]}
      />
      <Input
        onChange={props.handleNameChange}
        placeholder="Your name"
        type="text"
        required
        isError={isError}
      />
      <Input
        onChange={props.handleSurnameChange}
        placeholder="Your surname"
        type="text"
        required
        isError={isError}
      />
      <Input
        onChange={props.handleEmailChange}
        placeholder="Your email"
        type="text"
        required
        isError={isError}
      />
      <Input
        onChange={props.handlePasswordChange}
        placeholder="Password (min 6 characters)"
        type="password"
        required
        isError={isError}
      />
      <div className="checkboxBlock">
        <Checkbox
          checked={props.checked}
          onChange={props.handleCheckboxChange}
          isError={isError}
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
        <Link to={'/registration/sign-in'}>Sign In</Link>
      </div>
    </form>
  );
};
