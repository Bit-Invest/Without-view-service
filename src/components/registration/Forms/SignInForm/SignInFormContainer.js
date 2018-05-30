import * as React from 'react';
import { SignInForm } from './SignInForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { signInAction as signIn } from '@store/modules/registration';
import { LocalStorage } from '@common/Utils';
import PropTypes from 'prop-types';

class SignInFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checked: true,
      isError: false
    };
  }

  static propTypes = {
    push: PropTypes.func,
    signIn: PropTypes.func,
  };

  handleSubmit = event => {
    event.preventDefault();
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
    this.props.push('/profile');
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
    return <SignInForm
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
  bindActionCreators({push, signIn}, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(SignInFormContainer);

export {connectedContainer as SignInFormContainer};
