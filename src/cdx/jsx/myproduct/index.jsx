import React from 'react';
import mixins from '@cdx/mixins/';
import utils from '@cdx/utils/';
import Contexts from '@modules/contexts';

import InternalPage from '@cdx/jsx/common/internalPage/';
import BlackoutBlock from '@cdx/jsx/common/blackoutBlock/';
import RequisitionComponent from '@cdx/jsx/myproduct/requisition/';
import InvestorComponent from '@cdx/jsx/myproduct/investor/';
import FullProduct from '@cdx/jsx/common/fullProduct/';
import FollowForm from '@cdx/jsx/common/followForm/'; 
import GroupTrades from '@cdx/jsx/myproduct/groupTrades/';

import './style.scss';

const Consumer = Contexts.MyProductContext.Consumer;

export default class MyProductComponent extends React.Component {
  renderGroupOrdersList = ({actions}) => {
    const { 
      reduxState: {
        ordersFollowings,
        myFollowers,
        keys,
      }, 
      paramsProduct, 
    } = this.props;

    const noLoadedFollowers = mixins.common.dataNoLoaded([keys, myFollowers, ordersFollowings]);

    if (noLoadedFollowers[1]) return noLoadedFollowers[1];

    const { approvedFollowings }  = utils.myproduct
      .getRequisitionsProduct({
        productId: paramsProduct.productId,
        myFollowers,
      });

    const followings = utils.myproduct
      .getFollowingsNamedMyKeys(keys, approvedFollowings);

    const mergedPropsOrders = (orders, props) => 
      orders.map(curOrder => ({
        ...curOrder,
        ...(props.reduce((res, curProp) => {
          res[curProp[0]] = curProp[1];

          return res;
        }, {}))
      }));

    const tsOrdersFollowings = ordersFollowings.filter(curOrdersFollowings => 
      !!followings.find(curFollowing => 
        curOrdersFollowings.followingId === curFollowing._id
      ) 
    );

    const arrAllOrders = tsOrdersFollowings.reduce((res, curFollowing, index, arr) => {
      const leaderOrders = curFollowing.leaderOrders;
      const followerOrders = curFollowing.followerOrders;
      const followingLogs = curFollowing.followingLogs;

      const leaderKeyId = leaderOrders.length && leaderOrders[0].keyId;
      const nameLeader = leaderKeyId && (keys.find(curKeys => curKeys.keyId === leaderKeyId) || {name: 'error name'}).name;

      const followerKeyId = followerOrders.length && followerOrders[0].keyId;
      const nameFollower = followerKeyId && (followings.find(curFollowing => 
        curFollowing.follower === followerKeyId) || {nameFollower: 'error name'}).nameFollower;

      leaderOrders.forEach(curLeaderOrder => {
        const excess = res.allLeaderOrders.find(curAllLeaderOrders => curAllLeaderOrders.orderId === curLeaderOrder.orderId);

        if (!excess) {
          res.allLeaderOrders.push(...(mergedPropsOrders([curLeaderOrder], [
            ['name', nameLeader],
          ])));
        }
      });

      // res.allLeaderOrders.push(...(mergedPropsOrders(leaderOrders, [
      //   ['name', nameLeader],
      // ])));

      res.allFollowersOrders.push(...(mergedPropsOrders(followerOrders, [
        ['name', nameFollower],
      ])));

      res.allFollowingsLog.push(...followingLogs);

      return res;
    }, {
      allLeaderOrders: [],
      allFollowersOrders: [],
      allFollowingsLog: [],
    });

    const sortFromCreatedAt = (order1, order2) => (
      new Date(order2.createdAt).getTime() - new Date(order1.createdAt).getTime()
    );

    arrAllOrders.allLeaderOrders.sort(sortFromCreatedAt);
    arrAllOrders.allFollowersOrders.sort(sortFromCreatedAt);

    if (!arrAllOrders.allLeaderOrders.length) 
      return(
        <div className="logTrades">
          While empty.
        </div>
      );

    return <GroupTrades 
      arrAllOrders={arrAllOrders}
    />
  }

  renderListRequisitions = ({actions}) => {
    const { reduxState: {
      myFollowers,
      keys,
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
      .getFollowingsNamedMyKeys(keys, waitFollowings);

    resList[0] = filteredWaitIfIsI.map((curRequisition, index) => 
      <RequisitionComponent 
        status="wait"
        key={index}
        reduxState={curRequisition}
        methods={{
          sendApproveFollowing: actions.sendApproveFollowing,
          sendRejectFollowing: actions.sendRejectFollowing,
        }}
      />
    );

    resList[1] = filteredRejectIfIsI.map((curRequisition, index) => 
      <RequisitionComponent 
        status="reject"
        key={index}
        reduxState={curRequisition}
      />
    );

    if (!waitFollowings.length && !rejectFollowings.length) {
      return <div>You have not yet sent any applications for managing funds.</div>;
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
        key={index}
        reduxState={curInvestor}
        balances={balancesFollowings}
        methods={{
          setFreeze: actions.setFreezeFollowing,
          setUnFreeze: actions.setUnFreezeFollowing,
          getBalanceByFollowing: actions.getBalanceByFollowing,
          getOrdersByFollowing: actions.getOrdersByFollowing,
          setFollowingMode: actions.setFollowingMode,
        }}
      />
    );

    if (!approvedFollowings.length) {
      return <div>You have no active investors on this product yet.</div>;
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
    console.log('#MyProductComponent reduxState', this.props.reduxState);

    return(
      <Consumer>
        {({ actions }) => (
          <InternalPage {...this.props} {...({actions})} atopClass="myproduct">
            <BlackoutBlock atopClass="requisitions">
              <div className="typeList">
                <div className="curTitle">Following trades:</div>
                <div className="content">
                  {this.renderGroupOrdersList({actions})}
                </div>
              </div>
              <div className="typeList">
                <div className="curTitle">Your investors</div>
                <div className="content">
                  {this.renderListInvestors({actions})}
                </div>
              </div>
              <div className="typeList">
                <div className="curTitle">Your Requisitions</div>
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
