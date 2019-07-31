import React from 'react';
import { Route, Link } from "react-router-dom";
import { phrases } from '@cdx/utils/common';

import SignInForm from './forms/sign_in';
import SignUpForm from './forms/sign_up';

import './style.scss';
import './forms/style.scss';

export default class AuthPage extends React.Component {
  render() { 
    const { reduxState } = this.props;
    const { loginRes } = reduxState || {};
    const { accessToken } = loginRes || {};

    if (accessToken) this.props.history.push('/im');

    return(
      <div className="registration-page">
        <div className="form-column">
          <div className="logo"/>
          <div className="form">
            <Route path="/auth/sign-in" render={() => <SignInForm {...this.props} /> } />
            <Route path="/auth/sign-up" render={() => <SignUpForm {...this.props} /> } />
          </div>
          <div className="disclaimer">
            {phrases['auth-common']['#1']}
          </div>
        </div>
        <div className="picture-column" />
      </div>
    )
  }
};