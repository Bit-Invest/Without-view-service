import * as React from 'react';
import { RegistrationPage } from './RegistrationPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  CheckEmailForm
} from '@registration/Forms';
import {
  signUpAction
} from '@store/modules/registration';
import { push } from 'react-router-redux';

class RegistrationPageContainer extends React.Component {
  render() {
    return (
      <RegistrationPage>
        <Redirect from="/registration" to="/registration/sign-in" />
        <Switch>
          <Route path="/registration/sign-in" component={SignInForm}/>
          <Route path="/registration/sign-up" render={
            () => <SignUpForm
              isError={this.props.isSignUpError}
              signUp={this.props.signUpAction}
            />
          }/>
          <Route path="/registration/reset-password" render={
            () => <ResetPasswordForm isError={this.props.isFormError} />
          }/>
          <Route path="/registration/check-email" component={CheckEmailForm} />
        </Switch>
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
      signUpAction,
      push
    },
    dispatch
  );
const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(RegistrationPageContainer);
export {connectedContainer as RegistrationPageContainer};
