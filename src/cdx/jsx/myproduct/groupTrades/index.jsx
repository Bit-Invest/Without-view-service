import React from 'react';
import mixins from '@cdx/mixins/';
import utils from '@cdx/utils/';
import moment from 'moment';

import DrowDown from '@cdx/jsx/common/drowdown/';

import './style.scss';

export default class GroupTrades extends React.Component {
  constructor() {
    super();

    this.state = {
      quantityLeaderOrdersShow: 2,
    };
    this.timers = [];
  }

  componentWillMount() {
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

    approvedFollowings.forEach(curInvestor => {
      actions.getOrdersByFollowing({
        followingId: curInvestor._id,
      })

      this.timers.push(
        setInterval(() =>
          actions.getOrdersByFollowing({
            followingId: curInvestor._id,
          })
        , 5000)
      );
    });
  }

  componentWillUnmount() {
    this.timers.forEach(curTimer =>
      clearInterval(curTimer)
    );

    this.timers = [];
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
        new Date(order2.updatedAt).getTime() - new Date(order1.updatedAt).getTime()
      : 
        new Date(order1.updatedAt).getTime() - new Date(order2.updatedAt).getTime()
    );

    arrAllOrders.allOrders = arrAllOrders.allOrders
      .filter((corOrder) => !!new Date(corOrder.updatedAt).getTime())
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

    // <GroupTrades 
      // arrAllOrders={arrAllOrders}
      // tsOrdersFollowings={tsOrdersFollowings}
      // methods={{
        // getOrdersByFollowing: actions.getOrdersByFollowing,
      // }}
    // />
  }

  renderTrades = ({arrAllOrders}) => {
    const { 
      filter: {
        nosync: filterShowNoSync,
      },
    } = this.props;
    const { quantityLeaderOrdersShow } = this.state;

    const renderTradeLeader = (trade, hasLogTrades, drowdownContent, relativitySuccess) => (
      <div 
        className={`item leaderTrade ${hasLogTrades?'hasLogTrades':'noHasLogTrades'}`}
        key={`${trade.orderId}-${trade.symbol}`}
      >
        <div className="boxOfTrade clickMore">
          <div className="curClick" onClick={drowdownContent}></div>
        </div>
        <div className={`boxOfTrade relativitySuccess success-${relativitySuccess&&relativitySuccess[0]===relativitySuccess[1]}`}>
          <span className="curValue">
            {!relativitySuccess ? '1/1' : `${relativitySuccess[0]}/${relativitySuccess[1]}`}
          </span>
        </div>
        <div className="boxOfTrade emptySpace" style={{width: '2%'}}></div>
        <div className="boxOfTrade pair">{trade.symbol}</div>
        <div className="boxOfTrade type">{trade.type}</div>
        <div className={`boxOfTrade side ${trade.side}`}>{trade.side}</div>
        <div className="boxOfTrade price">{trade.price}</div>
        <div className="boxOfTrade quantity">{trade.quantity}</div>
        <div className={`boxOfTrade status ${trade.status}`}>{trade.status}</div>
        <div className="boxOfTrade time">{moment.utc(trade.createdAt?trade.createdAt:trade.updatedAt).toISOString().slice(11, 19)}</div>
      </div>
    );

    const renderTradeFollower = (trade) => (
      <div className="item followerTrade" key={`${trade.orderId}-${trade.symbol}`}>
        <div className="boxOfTrade emptySpace" style={{width: '10%'}}></div>
        <div className="boxOfTrade name">{trade.name}</div>
        <div className="boxOfTrade emptySpace" style={{width: '2%'}}></div>
        <div className="boxOfTrade line">
          <div className="tsLine"></div>
        </div>
        <div className="boxOfTrade price">{trade.price}</div>
        <div className="boxOfTrade quantity">{trade.quantity}</div>
        <div className={`boxOfTrade status ${trade.status}`}>{trade.status}</div>
        <div className="boxOfTrade time">{moment.utc(trade.createdAt?trade.createdAt:trade.updatedAt).toISOString().slice(11, 19)}</div>
      </div>
    );

    const renderNoFollowTrade = (trade) => (
      <div className={`item noFollowTrade show-${filterShowNoSync}`} key={`${trade.orderId}-${trade.symbol}`}>
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
        <div className="boxOfTrade time">{moment.utc(trade.createdAt?trade.createdAt:trade.updatedAt).toISOString().slice(11, 19)}</div>
      </div>
    );
    
    const listDays = {};
    const synchronizedFollowerTrades = {};

    const treatmentLeaderFollowing = (curLeaderOrder) => {
      const tsLogTradesCopied = arrAllOrders.allFollowingsLog.filter(curLogOrder =>
        curLogOrder.status === 'copied' && curLogOrder.leaderOrderId === curLeaderOrder.orderId
      );
      const tsFollowersTrades = arrAllOrders.allOrders.filter(curFollowerOrder =>
        !!tsLogTradesCopied.find(curLogOrder => 
          curLogOrder.followerOrderId === curFollowerOrder.orderId
        )
      );
      const curISODate = moment.utc(curLeaderOrder.updatedAt).toISOString().slice(0, 10);
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
        <DrowDown 
          Head={(props) => {
            return !props.isShow ? (
              <div className="curTradeParent">
                {renderTradeLeader(curLeaderOrder, hasLogTrades, props.drowdownContent, relativitySuccess)}
              </div>
            ) : null
          }}
          Content={(props) => (
            <div className="curTradeParent opened">
              {renderTradeLeader(curLeaderOrder, hasLogTrades, props.drowdownContent, relativitySuccess)}
              {hasLogTrades && (
                <div className="tsFollowersTrades">
                  {tsFollowersTrades.map(curFollowerTrade => renderTradeFollower(curFollowerTrade))}
                </div>
              )}
            </div>
          )}
        />
      );
    };

    const treatmentFollowerFollowing = (curFollowerOrder) => {
      const isSynchronized = arrAllOrders.allFollowingsLog
        .find(curFollowingLogOrder => 
          curFollowingLogOrder.followerOrderId === curFollowerOrder.orderId
        );

      if (isSynchronized) return false;

      const curISODate = moment.utc(curFollowerOrder.updatedAt).toISOString().slice(0, 10);

      Object.assign(listDays, {
        [curISODate]: listDays[curISODate] || [],
      });

      listDays[curISODate].push(renderNoFollowTrade(curFollowerOrder));
    };

    arrAllOrders.allOrders
      .every((curOrder, index) => {   
        if (curOrder.position === 'leader') {
          treatmentLeaderFollowing(curOrder);
        }
        
        if (curOrder.position === 'follower') {
          treatmentFollowerFollowing(curOrder);
        }

        return index < quantityLeaderOrdersShow;
      });

    const jsxListOrders = Object.entries(listDays)
      .map(([day, listJsx]) => (
        <div className="boxOfDay">
          <div className="titleDay">{day}</div>
          {listJsx}
        </div>
      ));

    return(
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
      </div>
    );
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
        <div className="moreTrades" onClick={this.showMoreTrade}>More trades</div>
      </div>
    ); 
  }
};
