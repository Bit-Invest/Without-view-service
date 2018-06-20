import * as React from 'react';
import { OrdersTerminal } from '@terminal/OrdersTerminal';

export class OrdersTerminalContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenend: false,
    };
  }

  toggleState = () => {
    this.setState({ isOpened: !this.state.isOpened });
    console.log('ok');
  }

  render() {
    return (
      <OrdersTerminal
        toggleState={this.toggleState}
        isOpenend={this.state.isOpenend}
      />
    )
  }
}
