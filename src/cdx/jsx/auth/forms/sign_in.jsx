import React from 'react';
import { Link } from "react-router-dom";
import Contexts from '@modules/contexts';
import configs from '@cdx/configs/';

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
      return this.setState({error: 'Fill in email'});

    if (!this.state.password)
      return this.setState({error: 'Fill in password'});

    requestAction({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    const { reduxState: { loginRes } } = this.props;
    const errorMessage = loginRes === configs.common.TYPES_RESULT['ERROR'] ? (
      `Incorrect login or password`
    ) : loginRes === configs.common.TYPES_RESULT['LOADING'] ? (
      `Loading..`
    ) : null;

    return(
      <Consumer>
        {({ actions }) => (
          <div className="signInForm">
            <div className="title">Sign In</div>
            <div className="error-block">{this.state.error || errorMessage}</div>
            <div className="input-wrap">
              <input 
                placeholder="Email" 
                // value={this.state.email}
                onChange={this.changeValueInputs.bind(this, 'email')}
              />
              <input 
                type="password" 
                placeholder="Password" 
                // value={this.state.password}
                onChange={this.changeValueInputs.bind(this, 'password')}
              />
            </div>
            <button className="button-wrap" onClick={this.submitSingIn.bind(this, actions.authLogin)}>Sign In</button>
            <div className="transitionAccount">
              You do not have an account? <Link className="span" to="/auth/sign-up">Sign Up</Link>
            </div>
          </div>
        )}
      </Consumer>
    )
  }
};
