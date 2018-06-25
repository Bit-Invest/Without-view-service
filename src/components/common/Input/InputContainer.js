import * as React from 'react';
import { Inpit } from './Input';

export class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: ''
    };
  }

  render() {
    return (
      <Input />
    );
  }

  onInput(event) {
    const onChange = this.props.onChange;
    this.setState({currentValue: event.target.value});
    onChange && onChange(event);
  }
}
