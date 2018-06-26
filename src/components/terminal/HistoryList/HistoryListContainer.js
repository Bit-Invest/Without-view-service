import * as React from 'react';
import { HistoryList } from './HistoryList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tradeHistory } from '@store/modules/terminal';

class HistoryListContainer extends React.Component {

  methodClick(event) {
    const { tradeHistory } = this.props;
    const price = this.props;
    const userData = {
      symbol: 'ETHBTC',
      stock: 'binance'
    };
    this.props.tradeHistory(userData)
      .then(this.onSuccessSubmit.bind(this))
      .catch(this.onErrorSubmit)

  }

  componentWillMount() {
    // const userData = {
    //   symbol: 'ETHBTC',
    //   stock: 'binance'
    // };
    // this.props.tradeHistory(userData)
    //   .then(this.onSuccessSubmit.bind(this))
    //   .catch(this.onErrorSubmit)
  }

  onSuccessSubmit(res) {
   // this.props.price = res.payload.data[0].price;
    console.log('res', res);
  }

  render() {
    return(
      <HistoryList
        price={this.props.historyData ? this.props.historyData[0].price : 0}
        time={this.props.time}
        qty={this.props.qty}
        methodClick={this.methodClick.bind(this)}
      />
    )
  }

}

const mapStateToProps = state => {
  return {historyData: state.terminal.historyList};
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    tradeHistory
  }, dispatch);
// dispatch(tradeHistory(userData))

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(HistoryListContainer);

export {connectedContainer as HistoryListContainer};
