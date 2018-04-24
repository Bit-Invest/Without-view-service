import * as React from 'react';
import { SignInForm } from './SignInForm';

export class SignInFormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      checked: true
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('text', this.state);
  };

  HandleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  HandlePasswordlChange = event => {
    this.setState({ password: event.target.value });
  };

  handleCheckboxChange = event => {
    const { checked } = event.target;
    this.setState({ checked: checked });
  };

  render() {
    return <SignInForm {...this} />;
  }
}
