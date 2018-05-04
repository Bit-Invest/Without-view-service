import * as React from 'react';
import { MarketplacePage } from './MarketplacePage';

export class MarketplacePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({isLoaded: true});
    }, 1000);
  }

  render() {
    return (
      <MarketplacePage isLoaded={this.state.isLoaded} />
    );
  }
}