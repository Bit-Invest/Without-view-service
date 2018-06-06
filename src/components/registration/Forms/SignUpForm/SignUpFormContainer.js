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
      name: '',
      surname: '',
      email: '',
      password: '',
      checked: true,
      isError: false
    };
  }

  static propTypes = {
    push: PropTypes.func,
    signUp: PropTypes.func
  };

  handleSubmit = event => {
    console.log(this.isErrorInForm());
    event.preventDefault();
    if (this.isErrorInForm()) {
      this.onErrorSubmit();
    } else {
      const data = {
        select: this.state.select,
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        password: this.state.password
      };
      const { signUp } = this.props;
      signUp(data)
        .then(this.onSuccessSubmit.bind(this))
        .catch(this.onErrorSubmit.bind(this));
    }
  };


  isErrorInForm() {
    return !(this.state.checked &&
      new RegExp("^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$").test(this.state.email))
  }

  onSuccessSubmit(res) {
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

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSurnameChange = event  => {
    this.setState({ surname: event.target.value });
  }

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
      handleNameChange,
      handleSurnameChange,
      handleEmailChange,
      handlePasswordChange,
      handleCheckboxChange
    } = this;
    return <SignUpForm
      handleSubmit={handleSubmit.bind(this)}
      handleSelectChange={handleSelectChange}
      handleEmailChange={handleEmailChange}
      handleNameChange={handleNameChange}
      handleSurnameChange={handleSurnameChange}
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
