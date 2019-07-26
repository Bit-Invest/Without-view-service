import React from 'react';
import utils from '@cdx/utils/';
import Contexts from '@modules/contexts';

import InternalPage from '@cdx/jsx/common/internalPage/';
import ListBlock from '@cdx/jsx/common/listBlock/';
import SmallProduct from '@cdx/jsx/common/smallProduct/';

import './style.scss';

const Consumer = Contexts.MarketplaceContext.Consumer;

export default class MarketplaceComponent extends React.Component {
  listBlocksForm = {
    marketProduct: (curData, index) => 
      <SmallProduct 
        key={index}
        data={curData}
        place="marketplace"
      />
  }

  render() {
    const { reduxState } = this.props;
    const marketProducts = utils.marketplace.getFilteredProducts(reduxState.marketProducts);

    return(
      <Consumer>
        {({ actions }) => (
          <InternalPage {...this.props} {...({actions})} atopClass="marketplace">
            {
              <ListBlock 
                atopClass="markets"
                uniqProperty="productId"
                reduxState={marketProducts}
                blockRender={this.listBlocksForm.marketProduct}
                renderFn="renderListProducts"
                typelist="marketproduct"
                methods={{
                  reload: actions.getProducts,
                  add: actions.addProduct,
                  remove: actions.removeKeys,
                  edit: actions.editKeys,
                }}
                texts={{
                  title: false,
                  addButtonText: false,
                }}
              />
            }
          </InternalPage>
        )}
      </Consumer>
    );
  }
};
