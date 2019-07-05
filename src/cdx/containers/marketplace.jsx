import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';

import ParentWrapperPages from './parent-wrapper';
import MarketplaceComponent from '@cdx/jsx/marketplace/';

const Provider = Contexts.MarketplaceContext.Provider

class MarketplaceContainer extends ParentWrapperPages {
  constructor() {
    super({
      namePage: 'marketplace',
      componentWillMount_cb: () => {
        //used actions in componentWillMount
      },
    })
  }

  render() {
    console.log('#MarketplaceContainer props', this.props);

    return(
      <Provider value={{
        actions: this.actions,
      }}>
        <MarketplaceComponent reduxState={this.props.reduxState} />
      </Provider>
    );
  }
};

const mapStateToProps = state => ({
  reduxState: {
    ...state.common,
    ...state.marketplace,
  },
  state,
});

export default connect(
  mapStateToProps,
)(MarketplaceContainer);
