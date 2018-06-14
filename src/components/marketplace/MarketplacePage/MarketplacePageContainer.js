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
        onClickCard={this.onClickCard.bind(this)}
        onClickList={this.onClickList.bind(this)}
        isLoaded={this.state.isLoaded}
        isShowedPopUp={this.state.isShowedPopUp}
        showType={this.state.showType}
        cards={[{exchange: 'BTC', id: 1}, {exchange: 'LTC', id: 2}, {exchange: 'LTC', id: 3}, {exchange: 'LTC', id: 4}, {exchange: 'LTC', id: 5}, {exchange: 'LTC', id: 6}, {exchange: 'BTC', id: 7}, {exchange: 'BTC', id: 8}]}
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
