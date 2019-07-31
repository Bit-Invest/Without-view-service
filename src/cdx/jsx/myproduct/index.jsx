import React from 'react';
import mixins from '@cdx/mixins/';
import utils from '@cdx/utils/';
import Contexts from '@modules/contexts';
import { phrases } from '@cdx/utils/common';

import InternalPage from '@cdx/jsx/common/internalPage/';
import BlackoutBlock from '@cdx/jsx/common/blackoutBlock/';
import RequisitionComponent from '@cdx/jsx/myproduct/requisition/';
import InvestorComponent from '@cdx/jsx/myproduct/investor/';
import FullProduct from '@cdx/jsx/common/fullProduct/';
import FollowForm from '@cdx/jsx/common/followForm/'; 
import GroupTrades from '@cdx/jsx/myproduct/groupTrades/';

import './style.scss';

const Consumer = Contexts.MyProductContext.Consumer;
const Logger = utils.common.logger('myproduct');

class GroupTradesParent extends React.Component {
  constructor() {
    super();

    this.state = {
      date: 'new',
      follower: 'all',
      nosync: 'show-all',
    };
  }

  startRenderGroupTrades = (props, actions, filter) => {
    const {
      myFollowers,
      keys,
      infoMarketProduct,
    } = this.props.reduxState;

    const noLoadedBlocksForTrades = mixins.common.dataNoLoaded([keys, myFollowers, infoMarketProduct]);

    if (noLoadedBlocksForTrades[1]) return noLoadedBlocksForTrades[1];

    return(
      <GroupTrades 
        {...props} 
        actions={actions} 
        filter={filter}
      />
    );
  }

  getFollowers = () => {
    const { 
      reduxState: {
        ordersFollowings,
        myFollowers,
        keys,
      }, 
      paramsProduct, 
    } = this.props;

    const noLoadedFollowers = mixins.common.dataNoLoaded([keys, myFollowers, ordersFollowings]);

    if (noLoadedFollowers[1]) return [];

    const { approvedFollowings }  = utils.myproduct
      .getRequisitionsProduct({
        productId: paramsProduct.productId,
        myFollowers,
      });

    const followings = utils.myproduct
      .getFollowingsNamedMyKeys(keys, approvedFollowings);

    return followings;
  }

  render() {
    const {
      date,
      follower,
      nosync,
    } = this.state;

    return(
      <div className="typeList followingTrades">
        <div className="curHead">
          <div className="curTitle">{phrases['myproduct']['#1']}</div>
          <div className="rightPanel">
            <div className="curTitle">{phrases['myproduct']['#2']}</div>
            <div className="filterMenu">
              <select onChange={(event)=>this.setState({date:event.target.value})}>
                <option value="new" selected={date === "new"}>{phrases['myproduct']['#3']}</option>
                <option value="old" selected={date === "old"}>{phrases['myproduct']['#4']}</option>
              </select>
              <select onChange={(event)=>this.setState({follower:event.target.value})}>
                <option value="all" selected={follower === "all"}>{phrases['myproduct']['#5']}</option>
                {this.getFollowers().map((curFollower, index) =>
                  <option value={curFollower.follower} key={index}>{curFollower.nameFollower}</option>
                )}
              </select>
              <select onChange={(event)=>this.setState({nosync:event.target.value})}>
                <option value={'show-all'} selected={nosync === 'show-all'}>{phrases['myproduct']['#6']}</option>
                <option value={'hide-all'} selected={nosync === 'hide-all'}>{phrases['myproduct']['#7']}</option>
                <option value={'show-only'} selected={nosync === 'show-only'}>{phrases['myproduct']['#8']}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          {this.startRenderGroupTrades(this.props, this.props.actions, {
            date,
            follower,
            nosync,
          })}
        </div>
      </div>
    );
  }
}

export default class MyProductComponent extends React.Component {
  renderListRequisitions = ({actions}) => {
    const { reduxState: {
      myFollowers,
      keys,
      balancesFollowings,
    }, paramsProduct } = this.props;
    const noLoadedFollowers = mixins.common.dataNoLoaded([keys, myFollowers]);

    if (noLoadedFollowers[1]) return noLoadedFollowers[1];

    const { waitFollowings, rejectFollowings }  = utils.myproduct.getRequisitionsProduct({
      productId: paramsProduct.productId,
      myFollowers: myFollowers,
    });

    const resList = [];

    const filteredWaitIfIsI = utils.myproduct
      .getFollowingsNamedMyKeys(keys, waitFollowings);

    const filteredRejectIfIsI = utils.myproduct
      .getFollowingsNamedMyKeys(keys, rejectFollowings);

    resList[0] = filteredWaitIfIsI.map((curRequisition, index) => 
      <RequisitionComponent 
        status="wait"
        key={curRequisition._id}
        reduxState={curRequisition}
        balances={balancesFollowings}
        methods={{
          sendApproveFollowing: actions.sendApproveFollowing,
          sendRejectFollowing: actions.sendRejectFollowing,
          getBalanceByFollowing: actions.getBalanceByFollowing,
        }}
      />
    );

    resList[1] = filteredRejectIfIsI.map((curRequisition, index) => 
      <RequisitionComponent 
        status="reject"
        key={curRequisition._id}
        reduxState={curRequisition}
      />
    );

    if (!waitFollowings.length && !rejectFollowings.length) {
      return <div>{phrases['myproduct']['#9']}</div>;
    }

    return resList;
  }

  renderListInvestors = ({actions}) => {
    const { reduxState: {
      myFollowers,
      keys,
      balancesFollowings,
    }, paramsProduct } = this.props;
    const noLoadedFollowers = mixins.common.dataNoLoaded([keys, myFollowers]);

    if (noLoadedFollowers[1]) return noLoadedFollowers[1];

    const { approvedFollowings }  = utils.myproduct
      .getRequisitionsProduct({
        productId: paramsProduct.productId,
        myFollowers: myFollowers,
      });

    const filteredInvestorsIfIsI = utils.myproduct
      .getFollowingsNamedMyKeys(keys, approvedFollowings);

    const resList = [];

    resList[0] = filteredInvestorsIfIsI.map((curInvestor, index) => 
      <InvestorComponent 
        key={curInvestor._id}
        reduxState={curInvestor}
        balances={balancesFollowings}
        methods={{
          setFreeze: actions.setFreezeFollowing,
          setUnFreeze: actions.setUnFreezeFollowing,
          getBalanceByFollowing: actions.getBalanceByFollowing,
          getOrdersByFollowing: actions.getOrdersByFollowing,
          setFollowingMode: actions.setFollowingMode,
          getFollowings: actions.getFollowings,
          getFollowers: actions.getFollowers,
          sendRejectFollowing: actions.sendRejectFollowing,
        }}
      />
    );

    if (!approvedFollowings.length) {
      return <div>{phrases['myproduct']['#9']}</div>;
    }

    return resList;
  }

  renderThisProduct = () => {
    const { reduxState } = this.props;
    const noLoadedFollowers = mixins.common.dataNoLoaded([reduxState.infoMarketProduct]);

    if (noLoadedFollowers[1]) return noLoadedFollowers[1];

    return <FullProduct reduxState={reduxState} />;
  }

  render() {
    const { reduxState } = this.props;
    Logger({
      body: {
        reduxState: this.props.reduxState,
      },
    });

    return(
      <Consumer>
        {({ actions }) => (
          <InternalPage {...this.props} {...({actions})} atopClass="myproduct">
            <BlackoutBlock atopClass="requisitions">
              <GroupTradesParent 
                {...this.props}
                actions={actions}
              />
              <div className="typeList investorList">
                <div className="curHead">
                  <div className="curTitle">{phrases['myproduct']['#10']}</div>
                  <div className="rightPanel"></div>
                </div>
                <div className="content">
                  {this.renderListInvestors({actions})}
                </div>
              </div>
              <div className="typeList requisitionsList">
                <div className="curHead">
                  <div className="curTitle">{phrases['myproduct']['#11']}</div>
                  <div className="rightPanel"></div>
                </div>
                <div className="content">
                  {this.renderListRequisitions({actions})}
                </div>
              </div>
            </BlackoutBlock>
            <BlackoutBlock atopClass="myproductinfo">
              <FollowForm  reduxState={reduxState} methods={actions} />
              {this.renderThisProduct()}
            </BlackoutBlock>
          </InternalPage>
        )}
      </Consumer>
    );
  }
};
