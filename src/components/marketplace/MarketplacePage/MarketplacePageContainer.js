import * as React from 'react';
import { MarketplacePage } from './MarketplacePage';

export class MarketplacePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isShowedPopUp: false
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
        isLoaded={this.state.isLoaded} 
        onClickCompare={this.onClickCompare.bind(this)}
        onClosePopUp={this.onClosePopUp.bind(this)}
        isShowedPopUp={this.state.isShowedPopUp}
      />
    );
  }

  onClickCompare() {
    this.setState({isShowedPopUp: true});
  }

  onClosePopUp() {
    this.setState({isShowedPopUp: false});
  }
}