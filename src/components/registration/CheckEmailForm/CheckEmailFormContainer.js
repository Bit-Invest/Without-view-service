import * as React from 'react';
import { CheckEmailForm } from './CheckEmailForm';

export class CheckEmailFormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      select: 'Trader',
      email: '',
      password: '',
      checked: true
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('text', this.state);
  };

  handleSelectChange = event => {
    this.setState({ select: event.target.value });
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
    return <CheckEmailForm {...this} />;
  }
}
