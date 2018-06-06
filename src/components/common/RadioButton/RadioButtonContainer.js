import * as React from 'react';
import { RadioButton } from './RadioButton';

export class RadioButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.isActive || false
    };
  }

  render() {
    return (
      <RadioButton
        isActive={this.state.isActive}
        onClick={this.onClick.bind(this)}
      />
    );
  }

  onClick() {
    this.setState({isActive: !this.state.isActive});
    props.onChange && props.onChange(this.state.isActive);
  }
}
