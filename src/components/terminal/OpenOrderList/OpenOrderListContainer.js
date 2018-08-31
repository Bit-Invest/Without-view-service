import * as React from 'react';
import { OpenOrderList } from './OpenOrderList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelOrder, openOrders } from '@store/modules/terminal';

class OpenOrderListContainer extends React.Component {
  render() {
    return (
      <OpenOrderList {...this.props} onClickClose={this.onClickClose}/>
    );
  }

  onClickClose = () => {
    this.props.cancelOrder({
      symbol: this.props.symbol,
      orderId: this.props.id,
      stockName: this.props.currentStock
    }).then(() => {
      this.props.openOrders({
        symbol: this.props.symbol,
        stock: this.props.currentStock
      });
    });
  }
}

const mapStateToProps = state => {
  return {
    currentStock: state.terminal.currentStock
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({cancelOrder, openOrders}, dispatch);
const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(OpenOrderListContainer);

export { connectedContainer as OpenOrderListContainer };
