import * as React from 'react';
import { RadioButton } from './RadioButton';

export class RadioButtonContainer extends React.Component {

  render() {
    return (
      <RadioButton
        isActive={this.props.isActive}
        onClick={this.onClick.bind(this)}
        title={this.props.title}
      />
    );
  }

  onClick() {
    this.props.onChange &&
      this.props.onChange(!this.props.isActive, this.props.index);
  }
}
