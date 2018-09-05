import * as React from 'react';
import { MarketplacePage } from './MarketplacePage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '@store/modules/marketplace';
import { LocalStorage } from '@common/Utils';
import { checkJWT } from '@store/modules/common';
import Tour from 'reactour';
import {
  userLogIn,
  getKeys,
  getSubscribedProducts,
  getPersonalInfo
} from '@store/modules/user';
import { objectLangs, lng } from '../../../lngs/index'

const ShowTypes = {
  CARD: 'CARD',
  LIST_ELEM: 'LIST_ELEM'
};

const tourConfig = [
  {
    selector: '.trader-card:nth-of-type(1) ',
    content: objectLangs[lng]['MarketplacePageContainer#1'],
    accentColor: '#f2f2f2'
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__chart-wrap.trader-card__chart-wrap_loaded',
    content: objectLangs[lng]['MarketplacePageContainer#2'],
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__exchange',
    content: objectLangs[lng]['MarketplacePageContainer#3'],
  },
  {
    selector: '.trader-card:nth-of-type(1) .user__name-wrap',
    content: objectLangs[lng]['MarketplacePageContainer#4'],
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__pair',
    content: objectLangs[lng]['MarketplacePageContainer#5'],
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__units',
    content: objectLangs[lng]['MarketplacePageContainer#6'],
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-stat:nth-of-type(1)',
    content: objectLangs[lng]['MarketplacePageContainer#7'],
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-stat:nth-of-type(2)',
    content: objectLangs[lng]['MarketplacePageContainer#8'],
  }, 
  {
    selector: '.trader-card:nth-of-type(1) .trader-stat:nth-of-type(3)',
    content: objectLangs[lng]['MarketplacePageContainer#9'],
  },
];

class MarketplacePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showType: ShowTypes.CARD,

      isTourOpen: false,
      isShowingMore: false,
    };
  }

  componentWillMount() {
    const { products } = this.props;

    if (products.length<6) {
      this.props.getProducts()
        .then(this.afterLoading.bind(this));
    } else {
      setTimeout(()=>{ // для симуляции подтягивания данных
        this.callbackLoaded();
      },500);
    }
  }

  afterLoading() {
    const token = LocalStorage.getItem('token');
    if (token) {
      this.props.checkJWT()
        .then(this.props.userLogIn)
        .then(this.props.getKeys)
        .then(this.props.getSubscribedProducts)
        .then(this.props.getPersonalInfo)
        .then(() => {this.callbackLoaded()})
    } else {
      this.callbackLoaded();
    }
  }

  callbackLoaded = () => {
    this.setState({
      isLoaded: true,
      isTourOpen: true
    });
  }

  toggleShowMore = () => {
    this.setState(prevState => ({
      isShowingMore: !prevState.isShowingMore,
    }))
  }

  closeTour = () => {
    this.setState({ isTourOpen: false })
  }

  openTour = () => {
    this.setState({ isTourOpen: true })
  }

  render() {
    const { isTourOpen, isShowingMore } = this.state;
    const accentColor = '#5cb7b7';

    return (
      <React.Fragment>
        <Tour
          onRequestClose={this.closeTour}
          steps={tourConfig}
          isOpen={isTourOpen}
          maskClassName="mask"
          className="helper"
          rounded={5}
          accentColor={accentColor}
        />
        <MarketplacePage
          onClickCard={this.onClickCard.bind(this)}
          onClickList={this.onClickList.bind(this)}
          isLoaded={this.state.isLoaded}
          isShowedPopUp={this.state.isShowedPopUp}
          showType={this.state.showType}
          cards={this.props.products}
        />
      </React.Fragment>
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
  bindActionCreators({
    getProducts,
    checkJWT,
    userLogIn,
    getKeys,
    getSubscribedProducts,
    getPersonalInfo
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(MarketplacePageContainer);
export { connectedContainer as MarketplacePageContainer };
