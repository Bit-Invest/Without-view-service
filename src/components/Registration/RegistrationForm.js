import React, { Component } from 'react';
import SelectComponent from './SelectComponent/SelectComponent';
import { InputComponent } from './InputComponent';
import InputPasswordComponent from './InputPasswordComponent/InputPasswordComponent';
import CheckboxComponent from './CheckboxComponent/CheckboxComponent';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      select: 'Trader',
      email: '',
      password: '',
      checked: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('text', this.state);
  }

  handleSelectChange = event => {
    this.setState({ select: event.target.value });
  };

  HandleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  PasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleCheckboxChange = event => {
    const { checked } = event.target;
    this.setState({ checked: checked });
  };

  render() {
    return (
      <div className="regBlock">
        <form className="RegistrationForm" onSubmit={this.handleSubmit}>
          <img className="logo" src="image/Logo.png" alt="" />
          <div className="title">Sign Up</div>
          <SelectComponent onChange={this.handleSelectChange} />
          <InputComponent onChange={this.HandleEmailChange} />
          <InputPasswordComponent onChange={this.PasswordChange} />
          <div className="checkboxBlock">
            <CheckboxComponent
              checked={this.state.checked}
              onChange={this.handleCheckboxChange}
            />
            <div>
              I give my consent to process and store my personal data for the
              purpose of verifying my identity.
            </div>
          </div>
          <button className="btn">Sign Up</button>
          <div className="transitionAccount">
            Already have an account? <span>Sign In</span>
          </div>
          <div className="infoHref">
            © 2018 CryptoActive | <span>Privacy Policy</span> &{' '}
            <span>Terms of Service</span>
          </div>
        </form>
        <img className="regFon" src="image/reg_fon.jpg" alt="" />
      </div>
    );
  }
}

export default RegistrationForm;
