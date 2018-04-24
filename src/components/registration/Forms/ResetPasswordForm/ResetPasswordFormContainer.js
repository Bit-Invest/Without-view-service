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

  HandleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <ResetPasswordForm {...this} />;
  }
}
