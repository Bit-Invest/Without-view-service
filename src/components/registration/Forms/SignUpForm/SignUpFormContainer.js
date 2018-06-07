import * as React from 'react';
import { SignUpForm } from './SignUpForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { signUpAction as signUp } from '@store/modules/registration';
import PropTypes from 'prop-types';

const ErrorMessage = {
  EMAIL_ERROR: 'Correct your email',
  CHECKBOX_ERROR: 'Please, give your consent to the processing of your data',
  PASWORD_ERROR: 'Too short password',
  DUBLICATE_EMAIL: 'This email is already used'
}

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
      errorMessage: '',
      isError: false
    };
  }

  static propTypes = {
    push: PropTypes.func,
    signUp: PropTypes.func
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isErrorInForm()) {
      this.errorInputEmail();
      this.onErrorSubmit();
    } else if (!this.state.checked) {
      this.checkboxError();
      this.onErrorSubmit();
    } else if (this.state.password.length < 8) {
      this.passwordError();
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
        .catch(this.onErrorEmailDuplicat.bind(this), console.log(data));
    }
  };


  isErrorInForm() {
    return !(new RegExp("^[A-Za-z0-9][A-Za-z0-9\.-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$").test(this.state.email))
  }

  passwordError = event => {
    this.setState({errorMessage: ErrorMessage.PASWORD_ERROR});
  }

  checkboxError = event => {
    this.setState({errorMessage: ErrorMessage.CHECKBOX_ERROR});
  }

  errorInputEmail = event => {
    this.setState({errorMessage: ErrorMessage.EMAIL_ERROR });
  }

  onSuccessSubmit(res) {
    this.props.push('/registration/sign-in');
  }

  onErrorEmailDuplicat(err) {
    console.log(err);
    this.onErrorSubmit();
    this.setState({errorMessage: ErrorMessage.DUBLICATE_EMAIL });
  }

  onErrorSubmit(err) {
    this.setState({isError: true});
  }

  handleSelectChange = event => {
    this.setState({ select: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  }

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
      errorMessage={this.state.errorMessage}
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
