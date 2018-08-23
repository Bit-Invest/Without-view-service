import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TraderCard } from './TraderCard';
import { showPopUp } from '@store/modules/common';
import { tradeHistory } from '@store/modules/marketplace';

class TraderCardContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  componentWillMount() {
    this.props.tradeHistory({
      keyId: this.props.id
    })
      .then(() => {
        this.setState({isLoaded: true});
      });
  }

  render() {
    console.log(this.props);
    return (
      <TraderCard
        onClick={this.onClickRoot}
        stockName={this.props.stockName}
        name={this.props.name}
        surname={this.props.surname}
        isLoaded={this.state.isLoaded}
        {...this.props}
      />
    );
  }

  onClickRoot = () => {
    this.props.showPopUp('productPage', {
      id: this.props.id,
      stockName: this.props.stockName,
      name: this.props.name,
      surname: this.props.surname,
      info: this.props.info,
      followersCount: this.props.followersCount,
      history: this.props.history[this.props.id]
    });
  };
}

const mapStateToProps = state => {
  return {
    history: state.marketplace.historyData
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({showPopUp, tradeHistory}, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(TraderCardContainer);

export {connectedContainer as TraderCardContainer};
