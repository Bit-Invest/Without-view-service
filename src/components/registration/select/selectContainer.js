import * as React from 'react';
import { Select } from './select';

export class selectContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenend: true,
    }
  }

  handleSelectChange = () => {
    this.setState({ isOpenend: !this.state.isOpenend });
  }

  render() {
    return (
      <Select
        {...this.props}
        handleSelectChange={this.handleSelectChange}
        isOpenend={this.state.isOpenend}
       />
    );
  }
}
