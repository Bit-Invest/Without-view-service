import * as React from 'react';
import { RegistrationPage } from './RegistrationPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  CheckEmailForm
} from '@registration/Forms';
import {
  SIGN_IN,
  SIGN_UP,
  RESET_PASSWORD
} from '@store/modules/registration';

const FORMS = {
  SIGN_IN: SignInForm,
  SIGN_UP: SignUpForm,
  RESET_PASSWORD: ResetPasswordForm,
  CHECK_EMAIL: CheckEmailForm
};

class RegistrationPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'SIGN_IN'
    };
  }

  onClickForgot = () => {
    const { setState } = this;

    setState &&
      setState({currentForm: 'RESET_PASSWORD'});
  }

  onClickSignUp = () => {
    const { setState } = this;

    setState &&
      setState({currentForm: 'SIGN_UP'});
  }

  onClickSignIn = () => {
    const { setState } = this;

    setState &&
      setState({currentForm: 'SIGN_IN'});
  }

  onCheckedEmail = () => {
    const { setState } = this;

    setState &&
      setState({currentForm: 'CHECK_EMAIL'});
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
          onClickForgot={onClickForgot}
          onClickSignIn={onClickSignIn}
          onClickSignUp={onClickSignUp}
          onCheckedEmail={onCheckedEmail}
          signIn={this.props.SIGN_IN}
          signUp={this.props.SIGN_UP}
          resetPassword={this.props.RESET_PASSWORD}
        />
      </RegistrationPage>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      SIGN_IN,
      SIGN_UP,
      RESET_PASSWORD
    },
    dispatch
  );
const connectedContainer =
  connect(null, mapDispatchToProps)(RegistrationPageContainer);
export {connectedContainer as RegistrationPageContainer};
