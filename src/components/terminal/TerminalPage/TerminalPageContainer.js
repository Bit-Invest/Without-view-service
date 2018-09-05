import * as React from 'react';
import { TerminalPage } from './TerminalPage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LocalStorage } from '@common/Utils';
import { checkJWT } from '@store/modules/common';
import { push } from 'react-router-redux';
import { userLogIn } from '@store/modules/user';
import { changeDateFilter } from '@store/modules/terminal'
import moment from 'moment'
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
import { objectLangs, lng } from '../../../lngs/index'

const FOUR_HOURS = moment().subtract(4, 'hour').format()
const ONE_DAY = moment().subtract(1, 'day').format()
const ONE_WEEK = moment().subtract(1, 'week').format()

const tourConfig = [
  {
    selector: '.terminal-head__stock-select',
    content: objectLangs[lng]['TerminalPageContainer#1'],
    accentColor: '#f2f2f2'
  },
  {
    selector: '.terminal-head__pair-select',
    content: objectLangs[lng]['TerminalPageContainer#2'],
  },
  {
    selector: '.terminal-head__type-select',
    content: objectLangs[lng]['TerminalPageContainer#3'],
  },
  {
    selector: '.order-book__block.order-book__block_bids',
    content: objectLangs[lng]['TerminalPageContainer#4'],
  },
  {
    selector: '.trader-history__caption',
    content: objectLangs[lng]['TerminalPageContainer#5'],
  },
  {
    selector: '.terminal-graph',
    content: objectLangs[lng]['TerminalPageContainer#6'],
  },
  {
    selector: '.tabs__button:nth-of-type(1)',
    content: objectLangs[lng]['TerminalPageContainer#7'],
  },
  {
    selector: '.order-block__order-types',
    content: objectLangs[lng]['TerminalPageContainer#8'],
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

  changeDateFilterValue = (value) => {
    if (this.props.data.dateFilterValue !== value) {
      this.props.changeDateFilter(value)
      this.loadData()
    }
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

  switchFilterVar = () => {
    let timeFilterVar
    switch (this.props.data.dateFilterValue) {
      case '4_hour':
        timeFilterVar = FOUR_HOURS
        break
      case '1_day':
        timeFilterVar = ONE_DAY
        break 
      case '1_week':
        timeFilterVar = ONE_WEEK
        break
      default:
        timeFilterVar = FOUR_HOURS
    }
    return timeFilterVar
  }

  loadData(opt_currentPair) {
    const currentPair =
      opt_currentPair ? opt_currentPair : this.props.data.currentPair;
    return this.props.getKeys().then((res) => {
      return Promise.all([
        this.preloaderLoaded(),
        this.props.marketData({
          symbol: currentPair.symbol,
          stock: this.props.data.currentStock,
          eventTime: {
            gte: this.switchFilterVar(),
            lt: Date.now()
          }
        }).then(() => {
          this.preloaderLoaded()
          this.setState({
            isLoaded: true,
          })
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

  preloaderLoaded = () => {
    this.setState({
      isLoaded: false,
    })
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
          changeDateFilterValue={this.changeDateFilterValue}
        />
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    data: state.terminal,
    burse: state.user.burses[0],
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
    fillOrders,
    changeDateFilter
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(TerminalPageContainer);

export { connectedContainer as TerminalPageContainer };
