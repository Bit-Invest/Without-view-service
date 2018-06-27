import * as React from 'react';
import { OrderBlock } from './OrderBlock';

export class OrderBlockContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: 'buy'
    };
  }

  onClickType = (type) => {
    this.setState({currentOrder: type});
  }

  render() {
    return (
      <OrderBlock
        activeType={this.state.currentOrder}
        onClickType={this.onClickType}
      />
    );
  }
}
