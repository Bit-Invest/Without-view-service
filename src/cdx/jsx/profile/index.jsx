import React from 'react';
import Contexts from '@modules/contexts';

import InternalPage from '@cdx/jsx/common/internalPage/';
import BlackoutBlock from '@cdx/jsx/common/blackoutBlock/';
import SmallKeys from '@cdx/jsx/profile/smallKeys/';
import SmallProduct from '@cdx/jsx/common/smallProduct/';

import SmallDashboard from '@cdx/jsx/profile/smallDashboard/';
import ListBlock from '@cdx/jsx/common/listBlock/';

import utils from '@cdx/utils/';

import './style.scss';

const Consumer = Contexts.ProfileContext.Consumer;

export default class ProfileComponent extends React.Component {
  listBlocksForm = {
    keys: (curData, index) =>
      <SmallKeys 
        key={index}
        data={curData}
      />,
    product: (curData, index) => 
      <SmallProduct 
        key={index}
        data={curData}
        place="profile"
      />
  }

  getDataForLists = () => {
    const { reduxState } = this.props;
    const { stateKeys } = utils.profile.getDataForSmallKeys(reduxState);
    const { keys: keysForAddingProduct } = utils.profile.getFreeKeys(
      reduxState, 
      (curKeys) => curKeys.groupName === 'my' || !curKeys.groupName
    );

    return {
      stateKeys,
      reduxState,
      keysForAddingProduct,
    };
  }
    
	render() {
    const { stateKeys, reduxState, keysForAddingProduct } = this.getDataForLists();

    return(
      <Consumer>
        {({ actions }) => (
          <InternalPage {...this.props} {...({actions})} atopClass="profile">
            <BlackoutBlock atopClass="dashboard">
              <SmallDashboard {...({reduxState})} />
            </BlackoutBlock>
            <BlackoutBlock atopClass="keys">
              <ListBlock 
                uniqProperty="keyId"
                reduxState={stateKeys}
                blockRender={this.listBlocksForm.keys}
                filter={(curData) => !curData.groupName || curData.groupName === 'my'}
                groupName="my"
                renderFn="renderListKeys"
                methods={{
                  reload: actions.getKeys,
                  add: actions.addKeys,
                  remove: actions.removeKeys,
                  edit: actions.editKeys,
                }}
                texts={{
                  title: 'My keys',
                  addButtonText: 'Add exchange account',
                }}
              />
            </BlackoutBlock>
            <BlackoutBlock atopClass="keys">
              <ListBlock 
                uniqProperty="keyId"
                reduxState={stateKeys}
                blockRender={this.listBlocksForm.keys}
                filter={(curData) => curData.groupName === 'investor'}
                groupName="investor"
                renderFn="renderListKeys"
                methods={{
                  reload: actions.getKeys,
                  add: actions.addKeys,
                  remove: actions.removeKeys,
                  edit: actions.editKeys,
                }}
                texts={{
                  title: 'My investors',
                  addButtonText: 'Add exchange account',
                }}
              />
            </BlackoutBlock>
            <BlackoutBlock atopClass="products">
              <ListBlock
                uniqProperty="productId"
                reduxState={reduxState.myProducts}
                keys={keysForAddingProduct}
                blockRender={this.listBlocksForm.product}
                renderFn="renderListProducts"
                typelist="myproduct"
                methods={{
                  reload: actions.getProducts,
                  add: actions.addProduct,
                  remove: actions.removeProduct,
                  edit: actions.editProduct,
                }}
                texts={{
                  title: 'My products',
                  addButtonText: 'Create product',
                }}
              />
            </BlackoutBlock>
          </InternalPage>
        )}
      </Consumer>
    );
  }
};
