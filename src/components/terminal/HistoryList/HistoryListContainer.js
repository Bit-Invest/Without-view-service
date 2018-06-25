import * as React from 'react';
import { HistoryList } from './HistoryList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tradeHistory } from '@store/modules/terminal';

class HistoryListContainer extends React.Component {
  
  methodClick(event) {
    const userData = {
      symbol: 'ETHBTC',
      stock: 'binance'
    };
    const { tradeHistory } = this.props;
    const price = this.props;
    tradeHistory(userData)
      .then(this.onSuccessSubmit.bind(this))
      .catch(this.onErrorSubmit)
  }

  onSuccessSubmit(res) {
//    this.props.price = res.payload.data[0].price; 
    console.log('res', res.payload.data[0].price);
  }
  
  render() {
    return(
      <HistoryList
        price={this.props.price}
        time={this.props.time}
        qty={this.props.qty}
        methodClick={this.methodClick.bind(this)}
      />
    )
  }
      
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    tradeHistory
  }, dispatch);


const connectedContainer =
  connect(null, mapDispatchToProps)(HistoryListContainer);

export {connectedContainer as HistoryListContainer};
