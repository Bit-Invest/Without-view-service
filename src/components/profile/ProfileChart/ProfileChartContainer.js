import * as React from 'react';
import { ProfileChart } from './ProfileChart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tradeHistory } from '@store/modules/marketplace';
import { Utils } from '@common/Utils';
import { balance } from '@store/modules/user';

class ProfileChartContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      currentData: [],
      currentBalance: null
    };
  }

  componentDidMount = () => {
    this.onClickProduct(this.props.products[0].nameProduct, this.props.products[0].id)
  }

  onClickProduct = (title, id) => {
    this.props.tradeHistory({productId: id}).then((res) => {
      this.setState({currentData: Utils.parseTradeHistory(res.payload.data.graph[0])});
    });
    this.props.balance(id).then((res) => {
      this.setState({currentBalance: res.payload.data});
    });
    this.setState({currentProduct: title});
  }

  render() {
    return (
      <ProfileChart
        {...this.props}
        currentProduct={this.state.currentProduct}
        data={this.state.currentData}
        onClickProduct={this.onClickProduct}
        currentBalance={this.state.currentBalance}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  tradeHistory,
  balance
}, dispatch);

const connectedContainer = connect(null, mapDispatchToProps)(ProfileChartContainer);
export { connectedContainer as ProfileChartContainer };
