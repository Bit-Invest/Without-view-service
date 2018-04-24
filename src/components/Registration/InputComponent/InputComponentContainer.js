import * as React from 'react';
import { InputComponent } from './InputComponent';

export class InputComponentContainer extends React.Component {
  render() {
    return <InputComponent {...this.props} />;
  }
}
