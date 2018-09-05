import React from 'react';
import { Input } from '@registration/input';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { objectLangs, lng } from '../../../../lngs/index'

export const ResetPasswordForm = props => {
  const { isError } = props;
  return (
    <form
      className="Reset-password__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">{ objectLangs[lng]['ResetPasswordForm#1'] }</div>
      <div className="success">
        { objectLangs[lng]['ResetPasswordForm#2'] }
      </div>
      <Input
        onChange={props.handleEmailChange}
        placeholder={ objectLangs[lng]['ResetPasswordForm#3'] }
        type="text"
        isError={isError}
      />
      <Button />
      <div className="transitionAccount">
        { objectLangs[lng]['ResetPasswordForm#4'] } <Link to={'/registration/sign-in'}>{ objectLangs[lng]['ResetPasswordForm#5'] }</Link>
      </div>
    </form>
  );
};
