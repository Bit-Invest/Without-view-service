import * as React from 'react';
import { TerminalForm } from './TerminalForm';

export class TerminalFormContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      price: '',
      value: '',
      total: ''
    }
  }

  handleEnter = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {

  }

  render(){
    return (
      <TerminalForm
        handleSubmit={this.handleSubmit.bind(this)}
        handleEnter={this.handleEnter}
        price={this.state.price}
        value={this.state.value}
        total={this.state.total}
      />
    );
  }
}
