import React from 'react';
import mixins from '@cdx/mixins/';
import utils from '@cdx/utils/';
import moment from 'moment';
import configs from '@cdx/configs/';

import CurTradeParent from './curTradeParent';

import './style.scss';

export default class GroupTrades extends React.Component {
  constructor() {
    super();

    this.state = {
      quantityLeaderOrdersShow: 5,
      allShowingTrades: 0,
    };
    this.timers = {};
  }

  componentWillMount() {
    this.startRequests();
  }

  componentWillUnmount() {
    this.stopRequests(); 
  }

  startRequests = () => {
    const { 
      reduxState: {
        myFollowers,
      }, 
      paramsProduct,
      actions, 
    } = this.props;

    const { approvedFollowings }  = utils.myproduct
      .getRequisitionsProduct({
        productId: paramsProduct.productId,
        myFollowers,
      });

    this.timers['getFollowingsOrders'] = async () => {
      const approvedFollowingsUsed = {};
      const asyncGetOrders = async () => {
        const nextFollowing = approvedFollowings.find(curApprovedFollowings => 
          !approvedFollowingsUsed[curApprovedFollowings._id]
        );

        if (!nextFollowing) {
          return setTimeout(this.timers['getFollowingsOrders'], (
            configs.myproduct.settings.intervalUpdateFollowersSec || 15000
          ));
        }

        await actions.getOrdersByFollowing({
          followingId: nextFollowing._id,
        });

        approvedFollowingsUsed[nextFollowing._id] = 'used';
        asyncGetOrders();
      };

      if (approvedFollowings.length)
        asyncGetOrders();
    };

    this.timers['getFollowingsOrders']();
  }

  stopRequests = () => {
    Object.keys(this.timers).forEach((curKeyTimer) =>
      this.timers[curKeyTimer] = () => {}
    );
  }

  renderGroupOrdersList = () => {
    const { 
      reduxState: {
        ordersFollowings,
        myFollowers,
        keys,
      }, 
      paramsProduct, 
      filter: {
        date: filterShowDate,
        follower: filterShowFollower,
      },
    } = this.props;

    const noLoadedFollowers = mixins.common.dataNoLoaded([keys, myFollowers, ordersFollowings]);

    if (noLoadedFollowers[1]) return noLoadedFollowers[1];

    const { approvedFollowings }  = utils.myproduct
      .getRequisitionsProduct({
        productId: paramsProduct.productId,
        myFollowers,
      });

    const followings = utils.myproduct
      .getFollowingsNamedMyKeys(keys, approvedFollowings)
      .filter(curFollowing => filterShowFollower === 'all' || filterShowFollower === curFollowing.follower);

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
        const excess = res.allOrders.find(curAllLeaderOrders => curAllLeaderOrders.orderId === curLeaderOrder.orderId);

        if (!excess) {
          res.allOrders.push(...(mergedPropsOrders([curLeaderOrder], [
            ['name', nameLeader],
            ['position', 'leader'],
          ])));
        }
      });

      res.allOrders.push(...(mergedPropsOrders(followerOrders, [
        ['name', nameFollower],
        ['position', 'follower'],
      ])));

      res.allFollowingsLog.push(...followingLogs);

      return res;
    }, {
      allOrders: [],
      allFollowingsLog: [],
    });

    const sortFromCreatedAt = (order1, order2) => (
      filterShowDate === 'new' ?
        new Date(order2.createdAt).getTime() - new Date(order1.createdAt).getTime()
      : 
        new Date(order1.createdAt).getTime() - new Date(order2.createdAt).getTime()
    );

    arrAllOrders.allOrders = arrAllOrders.allOrders
      .filter((corOrder) => !!new Date(corOrder.createdAt).getTime())
      .sort(sortFromCreatedAt);

    if (!arrAllOrders.allOrders.length) 
      return(
        <div className="logTrades">
          While empty.
        </div>
      );

    return this.renderTrades({
      arrAllOrders,
    });
  }

  renderTrades = ({arrAllOrders}) => {
    const { 
      filter: {
        nosync: filterShowNoSync,
      },
    } = this.props;
    const { quantityLeaderOrdersShow } = this.state;

    const renderNoFollowTrade = (trade) => (
      <div className={`item noFollowTrade`} key={`${trade.orderId}-${trade.symbol}`}>
        <div className="boxOfTrade clickMore">
          <div className="curClick"></div>
        </div>
        <div className="boxOfTrade relativitySuccess">
          <span className="curValue">{trade.name}</span>
        </div>
        <div className="boxOfTrade emptySpace" style={{width: '2%'}}></div>
        <div className="boxOfTrade pair">{trade.symbol}</div>
        <div className="boxOfTrade type">{trade.type}</div>
        <div className={`boxOfTrade side ${trade.side}`}>{trade.side}</div>
        <div className="boxOfTrade price">{trade.price}</div>
        <div className="boxOfTrade quantity">{trade.quantity}</div>
        <div className={`boxOfTrade status ${trade.status}`}>{trade.status}</div>
        <div className="boxOfTrade time">{moment.utc(trade.createdAt).toISOString().slice(11, 19)}</div>
      </div>
    );
    
    const listDays = {};
    const synchronizedFollowerTrades = {};

    const treatmentLeaderFollowing = (curLeaderOrder, isShow) => {
      if (filterShowNoSync === 'show-only') return false;
      if (!isShow) return 'not-shown';

      const tsLogTradesCopied = arrAllOrders.allFollowingsLog.filter(curLogOrder =>
        curLogOrder.status === 'copied' && (
          curLogOrder.leaderOrderId === curLeaderOrder.orderId &&
            curLogOrder.symbol === curLeaderOrder.symbol
        )
      );
      const tsFollowersTrades = arrAllOrders.allOrders.filter(curFollowerOrder =>
        !!tsLogTradesCopied.find(curLogOrder => 
          curLogOrder.followerOrderId === curFollowerOrder.orderId &&
            curLogOrder.symbol === curFollowerOrder.symbol
        )
      );
      const curISODate = moment.utc(curLeaderOrder.createdAt).toISOString().slice(0, 10);
      const hasLogTrades = tsFollowersTrades.length > 0;
      const relativitySuccess = hasLogTrades && 
        tsFollowersTrades.reduce((res, curTsFollowersTrades, index) => {
          res[0] += curTsFollowersTrades.status === curLeaderOrder.status ? 1 : 0;
          res[1] += 1;

          return res;
        }, [1, 1]);

      Object.assign(listDays, {
        [curISODate]: listDays[curISODate] || [],
      });

      tsFollowersTrades.forEach(curFollowerTrade => {
        synchronizedFollowerTrades[curFollowerTrade.orderId] = true;
      });
      
      listDays[curISODate].push(
        <CurTradeParent 
          {...({
            curLeaderOrder,
            hasLogTrades,
            relativitySuccess,
            tsFollowersTrades,
          })}
        />
      );
    };

    const treatmentFollowerFollowing = (curFollowerOrder, isShow) => {
      const isSynchronized = arrAllOrders.allFollowingsLog
        .find(curFollowingLogOrder => 
          curFollowingLogOrder.followerOrderId === curFollowerOrder.orderId
        );

      if (isSynchronized || filterShowNoSync === 'hide-all') return false;
      if (!isShow) return 'not-shown';

      const curISODate = moment.utc(curFollowerOrder.createdAt).toISOString().slice(0, 10);

      Object.assign(listDays, {
        [curISODate]: listDays[curISODate] || [],
      });

      listDays[curISODate].push(renderNoFollowTrade(curFollowerOrder));
    };

    let missedTradeCour = 0;
    let allShowingTrades = 0;

    arrAllOrders.allOrders
      .forEach((curOrder, index) => {
        const isShow = index < quantityLeaderOrdersShow + missedTradeCour;

        if (curOrder.position === 'leader') {
          const isMissed = treatmentLeaderFollowing(curOrder, isShow); 

          if (isMissed === false) missedTradeCour++;
          else allShowingTrades++;
        }
        
        if (curOrder.position === 'follower') {
          const isMissed = treatmentFollowerFollowing(curOrder, isShow);

          if (isMissed === false) missedTradeCour++;
          else allShowingTrades++;
        }
      });

    if (!allShowingTrades) 
      return(
        <div className="logTrades">
          While empty.
        </div>
      );

    const jsxListOrders = Object.entries(listDays)
      .map(([day, listJsx]) => (
        <div className="boxOfDay">
          <div className="titleDay">{day}</div>
          {listJsx}
        </div>
      ));

    const ButtonMore = () => (
      allShowingTrades > this.state.quantityLeaderOrdersShow && (
        <div className="moreTrades" onClick={this.showMoreTrade}>More trades</div>
      )
    );

    return [
      <div className="tradeItemsParent">
        <div className="item headTable">
          <div className="boxOfTrade emptySpace" style={{width: '30%'}}></div>
          <div className="boxOfTrade pair">Pair</div>
          <div className="boxOfTrade type">Type</div>
          <div className="boxOfTrade side">Side</div>
          <div className="boxOfTrade price">Price</div>
          <div className="boxOfTrade quantity">Quantity</div>
          <div className="boxOfTrade status">Status</div>
          <div className="boxOfTrade time">Time</div>
        </div>
        {jsxListOrders}
      </div>,
      <ButtonMore />,
    ];
  }

  showMoreTrade = () => {
    const { quantityLeaderOrdersShow } = this.state;

    this.setState({
      quantityLeaderOrdersShow: quantityLeaderOrdersShow + 6,
    })
  }

  render() {
    return(
      <div className="logTrades">
        {this.renderGroupOrdersList()}
      </div>
    ); 
  }
};
