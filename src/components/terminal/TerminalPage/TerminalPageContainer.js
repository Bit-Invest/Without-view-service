import * as React from 'react';
import { TerminalPage } from './TerminalPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { placeLimitOrder } from '@store/modules/terminal';
import { LocalStorage } from '@common/Utils';
import { checkJWT } from '@store/modules/common';
import { push } from 'react-router-redux';
import { userLogIn } from '@store/modules/user';
import {
  orderBook,
  tradeHistory,
  marketData,
  openOrders,
  getPairs
} from '@store/modules/terminal';

const OrderTypes = ['Limit', 'Market'];

class TerminalPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: 'Limit',
      isLoaded: false
    }
  }

  componentWillMount() {
    this.checkRedirect()
      .then(this.loadData.bind(this))
      .then(() => {
        this.setState({isLoaded: true});
      });
  }

  checkRedirect() {
    return new Promise((resolve, reject) => {
      const token = LocalStorage.getItem('token');
      if (token) {
        this.props.checkJWT()
          .then(() => {
            this.props.userLogIn();
            resolve();
          })
          .catch(() => {
            this.props.push('/marketplace');
          });
      } else {
        this.props.push('/marketplace');
      }
    });
  }

  loadData(opt_currentPair) {
    const currentPair =
      opt_currentPair ? opt_currentPair : this.props.data.currentPair;
    return Promise.all([
      this.props.marketData({
        symbol: currentPair.symbol,
        nameStock: 'binance',
        eventTime: {
          gte: Date.now() - 86400000,
          lt: Date.now()
        }
      }),
      this.props.orderBook({
        symbol: currentPair.symbol,
        stock: 'binance'
      }),
      this.props.tradeHistory({
        symbol: currentPair.symbol,
        stock: 'binance'
      }),
      this.props.openOrders({
        symbol: currentPair.symbol,
        stock: 'binance'
      }),
      this.props.getPairs()
    ]);
  }

  render() {
    return (
      <TerminalPage
        currentOrder={this.state.currentOrder}
        onChangeRadio={this.onChangeRadio.bind(this)}
        placeOrder={this.onPlaceOrder.bind(this)}
        isLoaded={this.state.isLoaded}
        history={this.props.data.historyList}
        orderBook={this.props.data.orderBook}
        openOrders={this.props.data.openOrders}
        loadData={this.loadData.bind(this)}
        currentPair={this.props.currentPair}
        chart={this.props.data.chart}
      />
    );
  }

  onChangeRadio(index) {
    this.setState({currentOrder: OrderTypes[index]});
  }

  onPlaceOrder(orderInfo, type) {
    this.props.placeLimitOrder({
      name: 'binance',
      method: this.state.currentOrder.toUpperCase(),
      symbol: 'LTCBTC',
      side: type.toUpperCase(),
      quantity: orderInfo.data,
      price: orderInfo.price
    });
  }
}

const mapStateToProps = state => {
  return {data: state.terminal};
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    placeLimitOrder,
    checkJWT,
    push,
    userLogIn,
    orderBook,
    tradeHistory,
    marketData,
    openOrders,
    getPairs
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(TerminalPageContainer);

export { connectedContainer as TerminalPageContainer };
