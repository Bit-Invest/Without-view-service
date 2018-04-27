import * as React from 'react';
import { SignInForm } from './SignInForm';

export class SignInFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checked: true,
      isError: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    const { signIn } = this.props;
    signIn(data).catch(() => {
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
    return <SignInForm
      onClickSignUp={this.props.onClickSignUp}
      onClickForgot={this.props.onClickForgot}
      handleSubmit={handleSubmit.bind(this)}
      handleSelectChange={handleSelectChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleCheckboxChange={handleCheckboxChange}
      checked={this.state.checked}
      isError={this.state.isError}
    />;
  }
}
