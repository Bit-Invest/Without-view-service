import * as React from 'react';
import { RegistrationPage } from './RegistrationPage';
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  CheckEmailForm
} from '@registration/Forms';

const FORMS = {
  SIGN_IN: <SignInForm />,
  SIGN_UP: <SignUpForm />,
  RESET_PASSWORD: <ResetPasswordForm />,
  CHECK_EMAIL: <CheckEmailForm />
};

export class RegistrationPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'SIGN_IN'
    };
  }

  render() {
    return (
      <React.Fragment>
        <RegistrationPage>
          {this.renderForm()}
        </RegistrationPage>
      </React.Fragment>
    );
  }

  renderForm() {
    return FORMS[this.state.currentForm];
  }
}
