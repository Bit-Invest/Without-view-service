import * as React from 'react';
import { RegistrationPage } from './RegistrationPage'

export class RegistrationPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'SIGN_IN'
    };
  }

  render() {
    return (
      <RegistrationPage>
        {this.calculateForm()}
      </RegistrationPage>
    );
  }

  calculateForm() {
    return null;
  }
}
