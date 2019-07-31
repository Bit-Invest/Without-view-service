import React from 'react';
import { Link } from "react-router-dom";
import Contexts from '@modules/contexts';
import configs from '@cdx/configs/';
import { phrases } from '@cdx/utils/common';

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
      return this.setState({error: phrases['auth-sign-up']['#9']});

    if (!this.state.lastName)
      return this.setState({error: phrases['auth-sign-up']['#10']});

    if (!this.state.email)
      return this.setState({error: phrases['auth-sign-up']['#11']});

    if (!this.state.password)
      return this.setState({error: phrases['auth-sign-up']['#12']});

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
      ['ERROR', phrases['auth-sign-up']['#13']]
    ) : authRegistration_res === configs.common.TYPES_RESULT['LOADING'] ? (
      ['LOADING', phrases['auth-sign-up']['#14']]
    ) : authRegistration_res === 'OK' ? (
      ['SUCCESS', phrases['auth-sign-up']['#15']]
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
            <div className="title">{phrases['auth-sign-up']['#1']}</div>
            {this.renderMessage({actions})}
            <div className="input-wrap">
              <input 
                placeholder={phrases['auth-sign-up']['#2']} 
                value={this.state.firstName}
                onChange={this.changeValueInputs.bind(this, 'firstName')}
              />
              <input 
                placeholder={phrases['auth-sign-up']['#3']} 
                value={this.state.lastName}
                onChange={this.changeValueInputs.bind(this, 'lastName')}
              />
              <input 
                placeholder={phrases['auth-sign-up']['#4']} 
                value={this.state.email}
                onChange={this.changeValueInputs.bind(this, 'email')}
              />
              <input 
                type="password" 
                placeholder={phrases['auth-sign-up']['#5']} 
                value={this.state.password}
                onChange={this.changeValueInputs.bind(this, 'password')}
              />
            </div>
            <button className="button-wrap" onClick={this.submitSingIn.bind(this, actions.authRegistration)}>{phrases['auth-sign-up']['#6']}</button>
            <div className="transitionAccount">
              {phrases['auth-sign-up']['#7']} <Link className="span" to="/auth/sign-in">{phrases['auth-sign-up']['#8']}</Link>
            </div>
          </div>
        )}
      </Consumer>
    )
  }
};
