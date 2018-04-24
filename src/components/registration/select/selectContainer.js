import * as React from 'react';
import { Select } from './select';

export class selectContainer extends React.Component {
  render() {
    return <Select {...this.props} />;
  }
}
