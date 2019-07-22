import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';
import utils from '@cdx/utils/';

import ParentWrapperPages from './parent-wrapper';
import MarketplaceComponent from '@cdx/jsx/marketplace/';

const Provider = Contexts.MarketplaceContext.Provider;
const Logger = utils.common.logger('marketproduct');

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
    Logger({
      body: {
        props: this.props,
      }
    });

    return(
      <Provider value={{
        actions: this.actions,
      }}>
        <MarketplaceComponent {...this.props} />
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
