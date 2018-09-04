import * as React from 'react';
import { TerminalPage } from './TerminalPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LocalStorage } from '@common/Utils';
import { checkJWT } from '@store/modules/common';
import { push } from 'react-router-redux';
import { userLogIn } from '@store/modules/user';
import Tour from 'reactour';
import {
  orderBook,
  tradeHistory,
  marketData,
  openOrders,
  getPairs,
  fillOrders
} from '@store/modules/terminal';
import { getKeys } from '@store/modules/user';

const FOUR_HOURS = 14400000;

const tourConfig = [
  {
    selector: '.terminal-head__stock-select',
    content: `Exchange selector`,
    accentColor: '#f2f2f2'
  },
  {
    selector: '.terminal-head__pair-select',
    content: "Assets pair",
  },
  {
    selector: '.terminal-head__type-select',
    content: 'Chart type',
  },
  {
    selector: '.order-book__block.order-book__block_bids',
    content: `Order book shows the demand and upply for the asset`,
  },
  {
    selector: '.trader-history__caption',
    content: `All the last trades for the pair`,
  },
  {
    selector: '.terminal-graph',
    content: `Here are the charts which provide the price dynamics of selected asset`,
  },
  {
    selector: '.tabs__button:nth-of-type(1)',
    content: `The list of open and closed orders `,
  },
  {
    selector: '.order-block__order-types',
    content: `Here you can arrange the trade operations`,
  }, 
];

class TerminalPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: 'Limit',
      isLoaded: false,

      isTourOpen: false,
      isShowingMore: false,
    };
  }

  componentWillMount() {
    this.checkRedirect()
      .then(this.loadData.bind(this))
      .then(() => {
        this.callbackLoaded();
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
    return this.props.getKeys().then((res) => {
      return Promise.all([
        this.props.marketData({
          symbol: currentPair.symbol,
          stock: this.props.data.currentStock,
          eventTime: {
            gte: Date.now() - FOUR_HOURS,
            lt: Date.now()
          }
        }),
        this.props.orderBook({
          symbol: currentPair.symbol,
          stock: this.props.data.currentStock
        }),
        this.props.tradeHistory({
          symbol: currentPair.symbol,
          stock: this.props.data.currentStock
        }),
        this.props.openOrders({
          symbol: currentPair.symbol,
          stock: this.props.data.currentStock
        }),
        this.props.fillOrders({
          symbol: currentPair.symbol,
          stock: this.props.data.currentStock,
          keyId: res.payload.data.keys[0].id
        }),
        this.props.getPairs()
    ])});
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
        <TerminalPage
          currentOrder={this.state.currentOrder}
          isLoaded={this.state.isLoaded}
          history={this.props.data.historyList}
          orderBook={this.props.data.orderBook}
          openOrders={this.props.data.openOrders}
          fillOrders={this.props.data.fillOrders}
          loadData={this.loadData.bind(this)}
          currentPair={this.props.currentPair}
          chart={this.props.data.chart}
          currentChartType={this.props.data.currentChartType}
        />
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    data: state.terminal,
    burse: state.user.burses[0]
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    checkJWT,
    push,
    userLogIn,
    orderBook,
    tradeHistory,
    marketData,
    openOrders,
    getPairs,
    getKeys,
    fillOrders
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(TerminalPageContainer);

export { connectedContainer as TerminalPageContainer };
