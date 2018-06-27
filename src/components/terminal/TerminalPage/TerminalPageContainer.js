import * as React from 'react';
import { TerminalPage } from './TerminalPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { placeLimitOrder } from '@store/modules/terminal';
import { LocalStorage } from '@common/Utils';
import { checkJWT, getPairs } from '@store/modules/common';
import { push } from 'react-router-redux';
import { userLogIn } from '@store/modules/user';
import { orderBook, tradeHistory, marketData } from '@store/modules/terminal';

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
    this.props.marketData();
    this.checkRedirect().then(() => {
      Promise.all([
        this.props.orderBook({
          symbol: 'ETHBTC',
          stock: 'binance'
        }),
        this.props.tradeHistory({
          symbol: 'ETHBTC',
          stock: 'binance'
        })
      ]).then(() => {
        this.setState({isLoaded: true});
      })
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

  render() {
    return (
      <TerminalPage
        currentOrder={this.state.currentOrder}
        onChangeRadio={this.onChangeRadio.bind(this)}
        placeOrder={this.onPlaceOrder.bind(this)}
        isLoaded={this.state.isLoaded}
        history={this.props.data.historyList}
        orderBook={this.props.data.orderBook}
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
    getPairs,
    marketData
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(TerminalPageContainer);

export { connectedContainer as TerminalPageContainer };
