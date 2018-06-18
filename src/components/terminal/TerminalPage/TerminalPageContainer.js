import * as React from 'react';
import { TerminalPage } from './TerminalPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { placeLimitOrder } from '@store/modules/terminal';
import { LocalStorage } from '@common/Utils';
import { checkJWT } from '@store/modules/common';
import { push } from 'react-router-redux';
import { userLogIn } from '@store/modules/user';

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
    const token = LocalStorage.getItem('token');
    if (token) {
      this.props.checkJWT()
        .then(() => {
          this.props.userLogIn();
          this.setState({isLoaded: true});
        })
        .catch(() => {this.props.push('/marketplace')});
    } else {
      this.props.push('/marketplace');
    }
  }

  render() {
    return (
      <TerminalPage
        currentOrder={this.state.currentOrder}
        onChangeRadio={this.onChangeRadio.bind(this)}
        placeOrder={this.onPlaceOrder.bind(this)}
        isLoaded={this.state.isLoaded}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({placeLimitOrder, checkJWT, push, userLogIn}, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(TerminalPageContainer);

export { connectedContainer as TerminalPageContainer };
