import * as React from 'react';
import { SignInForm } from './SignInForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { signInAction as signIn } from '@store/modules/registration';
import { userLogIn, authenticate, authpls } from '@store/modules/user';
import { hidePopUp } from '@store/modules/common';
import { LocalStorage } from '@common/Utils';
import { openingPosition } from '@store/modules/terminal';
import PropTypes from 'prop-types';

const ErrorMessage = 'Incorrect email or password';

class SignInFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checked: true,
      errorMessage: '',
      isError: false
    };
  }

  static propTypes = {
    push: PropTypes.func,
    signIn: PropTypes.func,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.hidePopUp();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    const { signIn } = this.props;
    signIn(data)
      .then(this.onSuccessSubmit.bind(this))
      .catch(this.onErrorSubmit.bind(this));
  };

  onSuccessSubmit(res) {
    res.payload.data &&
      LocalStorage.setItem('token', res.payload.data.token);
    this.props.userLogIn();
    this.props.authpls();
    this.props.authenticate();
    this.props.push('/profile');
  }

  onErrorSubmit(err) {
    this.setState({errorMessage: ErrorMessage});
    this.setState({isError: true});
  }

  handleEnter = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {
      handleSubmit,
      handleEnter
    } = this;
    return <SignInForm
      handleSubmit={handleSubmit.bind(this)}
      errorMessage={this.state.errorMessage}
      handleEnter={handleEnter.bind(this)}
      checked={this.state.checked}
      isError={this.state.isError}
    />;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    push,
    signIn,
    userLogIn,
    hidePopUp,
    authenticate,
    authpls,
    openingPosition
  }, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(SignInFormContainer);

export {connectedContainer as SignInFormContainer};
