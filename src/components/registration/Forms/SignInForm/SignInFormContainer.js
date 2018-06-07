import * as React from 'react';
import { SignInForm } from './SignInForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { signInAction as signIn } from '@store/modules/registration';
import { userLogIn } from '@store/modules/user';
import { hidePopUp } from '@store/modules/common';
import { LocalStorage } from '@common/Utils';
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
    this.props.push('/profile');
  }

  onErrorSubmit(err) {
    this.setState({errorMessage: ErrorMessage});
    this.setState({isError: true});
  }

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
      handleSubmit={handleSubmit.bind(this)}
      handleSelectChange={handleSelectChange}
      errorMessage={this.state.errorMessage}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleCheckboxChange={handleCheckboxChange}
      checked={this.state.checked}
      isError={this.state.isError}
    />;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({push, signIn, userLogIn, hidePopUp}, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(SignInFormContainer);

export {connectedContainer as SignInFormContainer};
