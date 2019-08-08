import React from 'react';
import utils from '@cdx/utils/';
import Contexts from '@modules/contexts';
import { phrases } from '@cdx/utils/common';

import InternalPage from '@cdx/jsx/common/internalPage/';
import ListBlock from '@cdx/jsx/common/listBlock/';
import SmallProduct from '@cdx/jsx/common/smallProduct/';

import './style.scss';

const Consumer = Contexts.MarketplaceContext.Consumer;

export default class MarketplaceComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      sortParam: 'followers',
      filterBaseAsset: 'ALL',
      filterStock: 'ALL',
    };
  }

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
    const { sortParam, filterBaseAsset, filterStock } = this.state;
    const marketProducts = utils.marketplace.getFilteredProducts(reduxState.marketProducts, {
      sortParam, filterBaseAsset, filterStock
    });

    return(
      <Consumer>
        {({ actions }) => (
          <InternalPage {...this.props} {...({actions})} atopClass="marketplace">
            <div className="filterHeader">
              <div className="item">
                <div className="curTitle">{phrases['marketplace']['#1']}</div>
                <div className="filterMenu">
                  <select onChange={(event)=>this.setState({sortParam:event.target.value})}>
                    <option value="date" selected={sortParam === "date"}>{phrases['marketplace']['#2']}</option>
                    <option value="followers" selected={sortParam === "followers"}>{phrases['marketplace']['#3']}</option>
                    <option value="rating" selected={sortParam === "rating"}>{phrases['marketplace']['#4']}</option>
                  </select>
                </div>
              </div>
              <div className="item">
                <div className="curTitle">{phrases['marketplace']['#6']}</div>
                <div className="filterMenu">
                  <label>
                    <select onChange={(event)=>this.setState({filterBaseAsset:event.target.value})}>
                      <option value="BTC" selected={filterBaseAsset === "BTC"}>BTC</option>
                      <option value="USD" selected={filterBaseAsset === "USD"}>USD</option>
                      <option value="ALL" selected={filterBaseAsset === "ALL"}>ALL</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="item">
                <div className="curTitle">{phrases['marketplace']['#7']}</div>
                <div className="filterMenu">
                  <label>
                    <select onChange={(event)=>this.setState({filterStock:event.target.value})}>
                      <option value="BINANCE" selected={filterStock === "BINANCE"}>BINANCE</option>
                      <option value="ALL" selected={filterStock === "ALL"}>ALL</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            {<ListBlock 
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
            />}
          </InternalPage>
        )}
      </Consumer>
    );
  }
};
