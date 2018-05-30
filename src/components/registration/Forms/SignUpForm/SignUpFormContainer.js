import * as React from 'react';
import { SignUpForm } from './SignUpForm';
import PropTypes from 'prop-types';

export class SignUpFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 'Trader',
      email: '',
      password: '',
      checked: true
    };
  }

  static propTypes = {
    onClickSignIn: PropTypes.func,
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    const { signUp } = this.props;
    signUp(data);
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
      handleSubmit={handleSubmit}
      handleSelectChange={handleSelectChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleCheckboxChange={handleCheckboxChange}
      checked={this.state.checked}
      isError={this.props.isError}
    />;
  }
}
