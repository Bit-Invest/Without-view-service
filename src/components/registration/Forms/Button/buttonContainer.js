import * as React from 'react';
import { Button } from './button';

export class buttonContainer extends React.Component {
  render() {
    return <Button {...this.props} />;
  }
}
