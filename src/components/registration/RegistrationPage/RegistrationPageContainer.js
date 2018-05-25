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
  signInAction,
  signUpAction,
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
      currentForm: 'SIGN_UP'
    };
  }

  // onClickForgot = () => {
  //   this.setState({
  //     currentForm: 'RESET_PASSWORD'
  //   });
  // }

  onClickSignUp = (e) => {
    this.setState({
      currentForm: 'SIGN_UP'
    });
  }

  onClickSignIn = () => {
    this.setState({
      currentForm: 'SIGN_IN'
    });
  }

  onCheckedEmail = () => {
    this.setState({
      currentForm: 'CHECK_EMAIL'
    });
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
          signIn={this.props.signInAction}
          signUp={this.props.signUpAction}
          resetPassword={this.props.RESET_PASSWORD}
          isError={this.props.isError}
        />
      </RegistrationPage>
    );
  }
}

const mapStateToProps = state => {
  return state.registration;
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signInAction,
      signUpAction,
      RESET_PASSWORD
    },
    dispatch
  );
const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(RegistrationPageContainer);
export {connectedContainer as RegistrationPageContainer};
