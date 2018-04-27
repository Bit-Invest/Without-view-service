import * as React from 'react';
import { SignUpForm } from './SignUpForm';

export class SignUpFormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      select: 'Trader',
      email: '',
      password: '',
      checked: true,
      isError: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    const { signUp } = this.props;
    signUp(data).catch(() => {
      this.setState({isError: true});
    });
  };

  handleSelectChange = event => {
    this.setState({ select: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleCheckboxChange = event => {
    const { checked } = event.target;
    this.setState({ checked: checked });
  };

  render() {
    const {
      handleSubmit,
      handleSelectChange,
      handleEmailChange,
      handlePasswordChange,
      handleCheckboxChange
    } = this;
    return <SignUpForm
      onClickSignIn={this.props.onClickSignIn}
      handleSubmit={handleSubmit}
      handleSelectChange={handleSelectChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleCheckboxChange={handleCheckboxChange}
      checked={this.state.checked}
      isError={this.state.isError}
    />;
  }
}
