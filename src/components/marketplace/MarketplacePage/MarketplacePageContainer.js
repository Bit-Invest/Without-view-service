import * as React from 'react';
import { MarketplacePage } from './MarketplacePage';

const ShowTypes = {
  CARD: 'CARD',
  LIST_ELEM: 'LIST_ELEM'
};

export class MarketplacePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isShowedPopUp: false,
      showType: ShowTypes.CARD
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({isLoaded: true});
    }, 1000);
  }

  render() {
    return (
      <MarketplacePage
        onClickCompare={this.onClickCompare.bind(this)}
        onClosePopUp={this.onClosePopUp.bind(this)}
        onClickCard={this.onClickCard.bind(this)}
        onClickList={this.onClickList.bind(this)}
        isLoaded={this.state.isLoaded}
        isShowedPopUp={this.state.isShowedPopUp}
        showType={this.state.showType}
        cards={[{exchange: 'BTC', id: 1}, {exchange: 'LTC', id: 2}, {exchange: 'LTC', id: 3}, {exchange: 'LTC', id: 3}, {exchange: 'LTC', id: 3}, {exchange: 'LTC', id: 3}, {exchange: 'BTC', id: 1}, {exchange: 'BTC', id: 1}]}
      />
    );
  }

  onClickList() {
    this.setState({showType: ShowTypes.LIST_ELEM});
  }

  onClickCard() {
    this.setState({showType: ShowTypes.CARD});
  }

  onClickCompare() {
    this.setState({isShowedPopUp: true});
  }

  onClosePopUp() {
    this.setState({isShowedPopUp: false});
  }
}
