import React from 'react';
import mixins from '@cdx/mixins/';
import Contexts from '@modules/contexts';

import InternalPage from '@cdx/jsx/common/internalPage/';
import FullProduct from '@cdx/jsx/common/fullProduct/';
import FollowForm from '@cdx/jsx/common/followForm/'; 

import './style.scss';

const Consumer = Contexts.MarketProductContext.Consumer;

export default class MarketProductComponent extends React.Component {
  renderFullProduct({actions}) {
    const { reduxState } = this.props;
    const noLoadedFollowers = mixins.common.dataNoLoaded([reduxState.infoMarketProduct]);

    if (noLoadedFollowers[1]) return noLoadedFollowers[1];

    return(
      <div className="marketProduct">
        <div className="content">
          <FullProduct  reduxState={reduxState} />
          <FollowForm reduxState={reduxState} methods={actions} />
        </div>
      </div>
    );
  }

  render() {
    const { reduxState } = this.props;

    return(
      <Consumer>
        {({ actions }) => (
          <InternalPage {...this.props} {...({actions})}>
            {this.renderFullProduct({
              actions,
            })}
          </InternalPage>
        )}
      </Consumer>
    );
  }
};
