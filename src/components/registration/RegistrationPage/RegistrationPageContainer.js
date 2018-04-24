import * as React from 'react';
import { RegistrationPage } from './RegistrationPage';
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  CheckEmailForm
} from '@registration/Forms';

const FORMS = {
  SIGN_IN: SignInForm,
  SIGN_UP: SignUpForm,
  RESET_PASSWORD: ResetPasswordForm,
  CHECK_EMAIL: CheckEmailForm
};

export class RegistrationPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'SIGN_IN'
    };
  }

  onClickForgot() {
    this.setState({currentForm: 'RESET_PASSWORD'});
  }

  onClickSignUp() {
    this.setState({currentForm: 'SIGN_UP'});
  }

  onClickSignIn() {
    this.setState({currentForm: 'SIGN_IN'});
  }

  onCheckedEmail() {
    this.setState({currentForm: 'CHECK_EMAIL'});
  }

  render() {
    const Form = FORMS[this.state.currentForm];
    const {
      onClickForgot,
      onClickSignIn,
      onClickSignUp,
      onCheckedEmail
    } = this;
    return (
      <RegistrationPage>
        <Form
          onClickForgot={onClickForgot.bind(this)}
          onClickSignIn={onClickSignIn.bind(this)}
          onClickSignUp={onClickSignUp.bind(this)}
          onCheckedEmail={onCheckedEmail.bind(this)}
        />
      </RegistrationPage>
    );
  }
}
