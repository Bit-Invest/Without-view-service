import * as React from 'react';
import { MarketplacePage } from './MarketplacePage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '@store/modules/marketplace';
import { LocalStorage } from '@common/Utils';
import { checkJWT } from '@store/modules/common';
import { userLogIn } from '@store/modules/user';

const ShowTypes = {
  CARD: 'CARD',
  LIST_ELEM: 'LIST_ELEM'
};

class MarketplacePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showType: ShowTypes.CARD
    };
  }

  componentWillMount() {
    this.props.getProducts()
      .then(this.afterLoading.bind(this));
  }

  afterLoading() {
    this.setState({isLoaded: true});
    const token = LocalStorage.getItem('token');
    if (token) {
      this.props.checkJWT()
        .then(this.props.userLogIn);
    }
  }

  render() {
    return (
      <MarketplacePage
        onClickCard={this.onClickCard.bind(this)}
        onClickList={this.onClickList.bind(this)}
        isLoaded={this.state.isLoaded}
        isShowedPopUp={this.state.isShowedPopUp}
        showType={this.state.showType}
        cards={this.props.products}
      />
    );
  }

  onClickList() {
    this.setState({showType: ShowTypes.LIST_ELEM});
  }

  onClickCard() {
    this.setState({showType: ShowTypes.CARD});
  }
}

const mapStateToProps = state =>
  {return {products: state.marketplace.products};}

const mapDispatchToProps = dispatch =>
  bindActionCreators({getProducts, checkJWT, userLogIn}, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(MarketplacePageContainer);
export { connectedContainer as MarketplacePageContainer };
