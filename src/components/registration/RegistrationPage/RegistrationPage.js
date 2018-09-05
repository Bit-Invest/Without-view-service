import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm as ResetPassword,
  CheckEmailForm
} from '@registration/Forms';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'registration-page';

export const RegistrationPage = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__form-column`}>
        <div className={`${ROOT_CLASS}__logo`} />
        <div className={`${ROOT_CLASS}__form`}>
          <Redirect from="/registration" to="/registration/sign-in" />
          <Switch>
            <Route path="/registration/sign-in" component={SignInForm}/>
            <Route path="/registration/sign-up" component={SignUpForm}/>
            <Route path="/registration/reset" component={ResetPassword}/>
            <Route path="/registration/check-email" component={CheckEmailForm}/>
          </Switch>
        </div>
        <div className={`${ROOT_CLASS}__disclaimer`}>
          { objectLangs[lng]['RegistrationPage#1'] } | <span>{ objectLangs[lng]['RegistrationPage#2'] }</span> &{' '}
          <span>{ objectLangs[lng]['RegistrationPage#3'] }</span>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__picture-column`} />
    </div>
  );
};
