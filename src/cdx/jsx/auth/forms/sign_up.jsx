import React from 'react';
import { Link } from "react-router-dom";
import Contexts from '@modules/contexts';
import configs from '@cdx/configs/';

const Consumer = Contexts.AuthContext.Consumer;

export default class SignUpForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
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
    if (!this.state.firstName)
      return this.setState({error: 'Fill in Name'});

    if (!this.state.lastName)
      return this.setState({error: 'Fill in Last name'});

    if (!this.state.email)
      return this.setState({error: 'Fill in email'});

    if (!this.state.password)
      return this.setState({error: 'Fill in password'});

    this.setState({error: null});

    requestAction({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  }

  renderMessage = ({actions}) => {
    const { error } = this.state;
    const { reduxState: { authRegistration_res } } = this.props;
    const errorMessage = authRegistration_res === configs.common.TYPES_RESULT['ERROR'] ? (
      ['ERROR', 'Request failed, try again.']
    ) : authRegistration_res === configs.common.TYPES_RESULT['LOADING'] ? (
      ['LOADING', 'Loading...']
    ) : authRegistration_res === 'OK' ? (
      ['SUCCESS', 'You are registered, you can log in.']
    ) : (
      ['ERROR', authRegistration_res]
    );

    if (authRegistration_res === 'OK') {
      setTimeout(() => {
        actions.clearAnyProperty({
          keyState: 'authRegistration_res',
          value: -1,
        });
        this.props.history.push('/auth/sign-in');
      }, 3000);
    }

    if (error || !errorMessage) return (
      <div className={`error-block ERROR`}>{error}</div>
    );

    return(
      <div className={`error-block ${errorMessage[0]}`}>{this.state.error || errorMessage[1]}</div>
    );
  }

  render() {
    return(
      <Consumer>
        {({ actions }) => (
          <div className="signUpForm">
            <div className="title">Sign Up</div>
            {this.renderMessage({actions})}
            <div className="input-wrap">
              <input 
                placeholder="Name" 
                value={this.state.firstName}
                onChange={this.changeValueInputs.bind(this, 'firstName')}
              />
              <input 
                placeholder="Last name" 
                value={this.state.lastName}
                onChange={this.changeValueInputs.bind(this, 'lastName')}
              />
              <input 
                placeholder="Email" 
                value={this.state.email}
                onChange={this.changeValueInputs.bind(this, 'email')}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={this.state.password}
                onChange={this.changeValueInputs.bind(this, 'password')}
              />
            </div>
            <button className="button-wrap" onClick={this.submitSingIn.bind(this, actions.authRegistration)}>Sign Up</button>
            <div className="transitionAccount">
              Do you have an account? <Link className="span" to="/auth/sign-in">Sign In</Link>
            </div>
          </div>
        )}
      </Consumer>
    )
  }
};
