import * as React from 'react';
import { OrdersTerminal } from '@terminal/OrdersTerminal';

export class OrdersTerminalContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openOrders: true,
      fillOrdersShow: false,
      depthMarket: false
    };
  }

  fillOrdersShow = () => {
    this.setState({
      openOrders: false,
      isOpened: true,
      depthMarket: false
    });
    console.log('fillOrders');
  }

  depthMarketShow = () => {
    this.setState({
      openOrders: false,
      isOpened: false,
      depthMarket: true
    });
    console.log('depthMarket');
  }

  openOrdersShow = () => {
    this.setState({
      openOrders: true,
      isOpened: true,
      depthMarket: false
    });
    console.log('openOrders');
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
