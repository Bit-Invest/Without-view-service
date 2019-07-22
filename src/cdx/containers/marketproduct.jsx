import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';
import utils from '@cdx/utils/';

import ParentWrapperPages from './parent-wrapper';
import MarketProductComponent from '@cdx/jsx/marketproduct/';

const Provider = Contexts.MarketProductContext.Provider;
const Logger = utils.common.logger('marketproduct');

class MarketProductContainer extends ParentWrapperPages {
  constructor() {
    super({
      namePage: 'marketproduct',
      componentWillMount_cb: () => {
        const { productId } = this.props.match.params;
        this.actions.getMarketProduct({productId});
      },
    })
  }

  render() {
    const { productId } = this.props.match.params;
    Logger({
      body: {
        reduxState: this.props.reduxState,
      },
    });

    return(
      <Provider value={{
        actions: this.actions,
      }}>
        <MarketProductComponent 
          {...this.props}
          paramsProduct={{
            productId,
          }} 
        />
      </Provider>
    );
  }
};

const mapStateToProps = state => ({
  reduxState: {
    ...state.common,
    ...state.marketproduct,
  },
  state,
});

export default connect(
  mapStateToProps,
)(MarketProductContainer);
