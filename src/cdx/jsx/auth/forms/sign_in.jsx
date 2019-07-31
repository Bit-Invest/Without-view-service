import React from 'react';
import { Link } from "react-router-dom";
import Contexts from '@modules/contexts';
import configs from '@cdx/configs/';
import { phrases } from '@cdx/utils/common';

const Consumer = Contexts.AuthContext.Consumer;

export default class SignInForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  changeValueInputs (property, event) {
    this.setState({
      [property]: event.target.value,
      error: '',
    });
  }

  submitSingIn (requestAction) {
    if (!this.state.email)
      return this.setState({error: phrases['auth-sign-in']['#7']});

    if (!this.state.password)
      return this.setState({error: phrases['auth-sign-in']['#8']});

    requestAction({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    const { reduxState: { loginRes } } = this.props;
    const errorMessage = loginRes === configs.common.TYPES_RESULT['ERROR'] ? (
      phrases['auth-sign-in']['#9']
    ) : loginRes === configs.common.TYPES_RESULT['LOADING'] ? (
      phrases['auth-sign-in']['#10']
    ) : null;

    return(
      <Consumer>
        {({ actions }) => (
          <div className="signInForm">
            <div className="title">{phrases['auth-sign-in']['#1']}</div>
            <div className="error-block">{this.state.error || errorMessage}</div>
            <div className="input-wrap">
              <input 
                placeholder={phrases['auth-sign-in']['#2']} 
                value={this.state.email}
                onChange={this.changeValueInputs.bind(this, 'email')}
              />
              <input 
                type="password" 
                placeholder={phrases['auth-sign-in']['#3']} 
                value={this.state.password}
                onChange={this.changeValueInputs.bind(this, 'password')}
              />
            </div>
            <button className="button-wrap" onClick={this.submitSingIn.bind(this, actions.authLogin)}>{phrases['auth-sign-in']['#4']}</button>
            <div className="transitionAccount">
              {phrases['auth-sign-in']['#5']} <Link className="span" to="/auth/sign-up">{phrases['auth-sign-in']['#6']}</Link>
            </div>
          </div>
        )}
      </Consumer>
    )
  }
};
