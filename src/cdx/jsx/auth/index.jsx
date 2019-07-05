import React from 'react';
import { Route } from "react-router-dom";

import SignInForm from './forms/sign_in';
import SignUpForm from './forms/sign_up';

import './style.scss';
import './forms/style.scss';

export default class AuthPage extends React.Component {
  render() {
    if (this.props.reduxState.loginRes.accessToken) {
      console.log('yes', this.props.reduxState.loginRes.accessToken);
      this.props.history.push('/im');
    }

    return(
      <div className="registration-page">
        <div className="form-column">
          <div className="logo"/>
          <div className="form">
            <Route path="/auth/sign-in" render={() => <SignInForm {...this.props} /> } />
            <Route path="/auth/sign-up" render={() => <SignUpForm {...this.props} /> } />
          </div>
          <div className="disclaimer">
            © 2019 Cindx | <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
        <div className="picture-column" />
      </div>
    )
  }
};