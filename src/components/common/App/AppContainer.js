import * as React from 'react';
import { App } from './App';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { checkJWT } from '@store/modules/common';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Tour from 'reactour';

class AppContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      isTourOpen: false,
      isShowingMore: false,
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        isTourOpen: true
      });
    }, 2000);
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
    const { isTourOpen, isShowingMore } = this.state
    const accentColor = '#5cb7b7'

    return (
      <div>
        <Tour
          onRequestClose={this.closeTour}
          steps={tourConfig}
          isOpen={isTourOpen}
          maskClassName="mask"
          className="helper"
          rounded={5}
          accentColor={accentColor}
        />

        <App />
      </div>
    )
  }
}

const tourConfig = [
  {
    selector: '.trader-card:nth-of-type(1) ',
    content: `Product Card`,
    accentColor: '#f2f2f2'
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__chart-wrap.trader-card__chart-wrap_loaded',
    content: "Indicator of profitability",
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__exchange',
    content: 'Exchange where the product is allocated',
  },
  {
    selector: '.trader-card:nth-of-type(1) .user__name-wrap',
    content: `Investment products provided by asset managers`,
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__pair',
    content: `Basic asset`,
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-card__units',
    content: `Profitability of the strategy`,
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-stat:nth-of-type(1)',
    content: `The period of implementation`,
  },
  {
    selector: '.trader-card:nth-of-type(1) .trader-stat:nth-of-type(2)',
    content: `The fees to be paid to asset manager for successful trades`,
  }, 
  {
    selector: '.trader-card:nth-of-type(1) .trader-stat:nth-of-type(3)',
    content: `The number of investors connected`,
  },
];

const mapStateToProps = (state) => {
  return {pathname: state.router.location.pathname};
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({checkJWT, push}, dispatch);
const connectedContainer =
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
export { connectedContainer as AppContainer };
