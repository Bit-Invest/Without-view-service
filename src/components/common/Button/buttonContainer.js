import * as React from 'react';
import { Button } from './Button';

export class buttonContainer extends React.Component {
  render() {
    return <Button {...this.props} />;
  }
}
