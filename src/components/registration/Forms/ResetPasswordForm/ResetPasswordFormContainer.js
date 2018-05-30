import * as React from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';

export class ResetPasswordFormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isError: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    const {
      resetPassword,
      onCheckedEmail
    } = this.props;
    resetPassword(data)
      .then(() => {
        onCheckedEmail();
      })
      .catch(() => {
        this.setState({isError: true});
      });
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
      isError={this.state.isError}
    />;
  }
}
