import * as React from 'react';
import { PopUpProductPage } from './PopUpProductPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeOnTrader } from '@store/modules/user';
import { hidePopUp } from '@store/modules/common';

class PopUpProductPageContainer extends React.Component {
  render() {
    return (
      <PopUpProductPage
        {...this.props}
        onClickConnect={this.onClickConnect}
        isNeedHide={this.props.products.indexOf(this.props.id) >= 0}
      />
    );
  }

  onClickConnect = () => {
    this.props.subscribeOnTrader({
      "product": this.props.id,
      "key": this.props.userStocks.find(stock => {
        return stock.stock === this.props.nameStor
      }).id
    }).then(() => {this.props.hidePopUp()});
  }
}

const mapStateToProps = state => {
  return {
    userStocks: state.user.burses,
    personalInfo: state.user.personalInfo,
    products: state.user.products
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({subscribeOnTrader, hidePopUp}, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(PopUpProductPageContainer);

export { connectedContainer as PopUpProductPageContainer };
