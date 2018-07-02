import * as React from 'react';
import { TerminalForm } from './TerminalForm';
import { connect } from 'react-redux';

class TerminalFormContainer extends React.Component {
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
    event.preventDefault();
  }

  render() {
    return (
      <TerminalForm
        type={this.props.type}
        orderType={this.props.orderType}
        currentPair={this.props.currentPair}
      />
    );
  }
}

const mapStateToProps = state => {
  return {currentPair: state.terminal.currentPair};
}

const connectedContainer =
  connect(mapStateToProps, null)(TerminalFormContainer);

export { connectedContainer as TerminalFormContainer };
