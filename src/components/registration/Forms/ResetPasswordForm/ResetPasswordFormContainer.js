import * as React from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';

export class ResetPasswordFormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('text', this.state);
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    const {
      handleEmailChange,
      handleSubmit
    } = this;
    return <ResetPasswordForm
      handleSubmit={handleSubmit}
      handleEmailChange={handleEmailChange}
      onClickSignIn={this.props.onClickSignIn}
    />;
  }
}
