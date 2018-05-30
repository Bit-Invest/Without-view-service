import * as React from 'react';
import { RegistrationPage } from './RegistrationPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  CheckEmailForm
} from '@registration/Forms';

class RegistrationPageContainer extends React.Component {
  render() {
    return (
      <RegistrationPage>
        <Redirect from="/registration" to="/registration/sign-in" />
        <Switch>
          <Route path="/registration/sign-in" component={SignInForm}/>
          <Route path="/registration/sign-up" component={SignUpForm}/>
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
const connectedContainer =
  connect(mapStateToProps, null)(RegistrationPageContainer);
export {connectedContainer as RegistrationPageContainer};
