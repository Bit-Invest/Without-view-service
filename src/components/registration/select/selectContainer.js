import * as React from 'react';
import { Select } from './select';

export class selectContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpened: true,
      currentOption: {
        label: props.defaultOption ? props.defaultOption.label : '',
        value: props.defaultOption ? props.defaultOption.value : ''
      }
    }
  }

  onSelect = (option) => {
    console.log(option);
    this.props.onChange && this.props.onChange(option);
    this.setState({currentOption: option});
  }

  handleSelectChange = () => {
    console.log('@@@@');
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    return (
      <Select
        {...this.props}
        handleSelectChange={this.handleSelectChange}
        isOpened={this.state.isOpened}
        currentOption={this.state.currentOption}
        onSelect={this.onSelect}
      />
    );
  }
}
