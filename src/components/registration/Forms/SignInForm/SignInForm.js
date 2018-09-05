import React from 'react';
import { Input } from '@registration/input';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { objectLangs, lng } from '../../../../lngs/index'

export const SignInForm = props => {
  const { isError } = props;
  return (
    <form
      className="SignInForms__RegistrationForm"
    >
      <div className="title">{ objectLangs[lng]['SignInForm#1'] }</div>
      <div className='SignInForms__RegistrationForm__error-block'>{props.errorMessage}</div>
      <div className="SignInForms__input-wrap">
        <Input
          onChange={props.handleEnter}
          placeholder={ objectLangs[lng]['SignInForm#2'] }
          type="text"
          isError={isError}
          name="email"
        />
      </div>
      <div className="SignInForms__input-wrap">
        <Input
          onChange={props.handleEnter}
          placeholder={ objectLangs[lng]['SignInForm#3'] }
          type="password"
          isError={isError}
          name="password"
        />
      </div>
      <div className="button-wrap">
        <Button theme="gradient-img" NameBtn={ objectLangs[lng]['SignInForm#1'] } preloader={props.preloader} onClick={props.handleSubmit} />
      </div>
      <div className="button-wrap">
        <Button theme="gradient-img" NameBtn={ objectLangs[lng]['SignInForm#6'] } preloader={props.preloader} onClick={props.onClickDemo}/>
      </div>
      <div className="transitionAccount">
        { objectLangs[lng]['SignInForm#4'] }{' '}
        <Link className='span' to={'/registration/sign-up'}>{ objectLangs[lng]['SignInForm#5'] }</Link>
      </div>
    </form>
  );
};
