import * as React from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';
import PropTypes from 'prop-types';

export class ResetPasswordFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isError: false
    };
  }

  static propTypes = {
    onClickSignIn: PropTypes.func,
  };

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
      onClickSignIn={this.props.onClickSignIn}
      isError={this.state.isError}
    />;
  }
}
