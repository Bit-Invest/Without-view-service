import * as React from 'react';
import { SignUpForm } from './SignUpForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { signUpAction as signUp } from '@store/modules/registration';
import PropTypes from 'prop-types';

class SignUpFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 'Trader',
      email: '',
      password: '',
      checked: true,
      isError: false
    };
  }

  static propTypes = {
    onClickSignIn: PropTypes.func,
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    const { signUp } = this.props;
    signUp(data)
      .then(this.onSuccessSubmit.bind(this))
      .catch(this.onErrorSubmit.bind(this));
  };

  onSuccessSubmit(res) {
    console.log('ok');
    this.props.push('/registration/sign-in');
  }

  onErrorSubmit(err) {
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
    return <SignUpForm
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({push, signUp}, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(SignUpFormContainer);

export {connectedContainer as SignUpFormContainer};
