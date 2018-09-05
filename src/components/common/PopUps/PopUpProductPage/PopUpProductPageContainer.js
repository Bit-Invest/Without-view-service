import * as React from 'react';
import { PopUpProductPage } from './PopUpProductPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  subscribeOnTrader,
  unsubscribeTrader,
  getSubscribedProducts
} from '@store/modules/user';
import { hidePopUp } from '@store/modules/common';
import { getProducts } from '@store/modules/marketplace';

class PopUpProductPageContainer extends React.Component {
  render() {
    return (
      <PopUpProductPage
        {...this.props}
        onClickConnect={this.onClickConnect}
        onClickDisconnect={this.onClickDisconnect}
        isNeedHide={this.props.products.indexOf(this.props.id) >= 0}
        isNeedHideDisc={this.props.products.indexOf(this.props.id) < 0}
      />
    );
  }

  onClickConnect = () => {
    this.props.subscribeOnTrader({
      "productId": this.props.id,
      "key": this.props.userStocks.find(stock => {
        return stock.stock === this.props.stockName
      }).id
    }).then(this.onFinishConnect);
  }

  onClickDisconnect = () => {
    this.props.unsubscribeTrader({
      "productId": this.props.id,
      "key": this.props.userStocks.find(stock => {
        return stock.stock === this.props.stockName
      }).id
    }).then(this.onFinishConnect);
  }

  onFinishConnect = () => {
    this.props.getSubscribedProducts();
    this.props.getProducts();
    this.props.hidePopUp();
  }
}

const mapStateToProps = state => {
  return {
    userStocks: state.user.burses,
    personalInfo: state.user.personalInfo,
    products: state.user.products,
    productsManager: state.marketplace.products,
    hasKey: state.user.burses.findIndex((burse) => {
      return burse.status === 'valid';
    }) >= 0
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    unsubscribeTrader,
    subscribeOnTrader,
    hidePopUp,
    getSubscribedProducts,
    getProducts
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(PopUpProductPageContainer);

export { connectedContainer as PopUpProductPageContainer };
