import React from 'react';
import mixins from '@cdx/mixins/';
import utils from '@cdx/utils/';

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
        // setInterval(() =>
        //   actions.getOrdersByFollowing({
        //     followingId: curInvestor._id,
        //   })
        // , 5000)
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
    const { quantityLeaderOrdersShow } = this.state;

    const renderTradeLeader = (trade, atopClass) => (
      <div className={`trade ${atopClass}`}>
        <div>{trade.symbol}</div>
        <div>{trade.type}</div>
        <div>{trade.side}</div>
        <div>Price: {trade.price}</div>
        <div>{trade.quantity}</div>
        <div>{trade.status}</div>
        <DrowDown 
          Head={(props) => <div onClick={props.drowdownContent} style={{display: props.isShow ? 'none' : null}}>more..</div>}
          Content={(props) => (
            <div>{trade.createdAt}</div>
          )}
        />
      </div>
    );

    const renderTradeFollower = (trade, atopClass) => (
      <div className={`trade ${atopClass}`}>
        <div>{trade.name}</div>
        <div>{trade.symbol}</div>
        <div>{trade.type}</div>
        <div>{trade.side}</div>
        <div>Price: {trade.price}</div>
        <div>{trade.quantity}</div>
        <div>{trade.status}</div>
        <DrowDown 
          Head={(props) => <div onClick={props.drowdownContent} style={{display: props.isShow ? 'none' : null}}>more..</div>}
          Content={(props) => (
            <div>{trade.createdAt}</div>
          )}
        />
      </div>
    );
    
    const jsxListOrders = [];

    arrAllOrders.allLeaderOrders
      .every((curLeaderOrder, index) => {          
        const tsLogTrades = arrAllOrders.allFollowingsLog.filter(curLogOrder =>
          curLogOrder.leaderOrderId === curLeaderOrder.orderId
        );
        const tsFollowersTrades = arrAllOrders.allFollowersOrders.filter(curFollowerOrder =>
          !!tsLogTrades.find(curLogOrder => curLogOrder.followerOrderId === curFollowerOrder.orderId)
        );

        jsxListOrders.push(
          <div className="item">
            {renderTradeLeader(curLeaderOrder, 'leaderTrade')}
            {tsFollowersTrades.length > 0 && (
              <DrowDown 
                Head={(props) => (
                  <div 
                    className={`clickShowFollowingTrades ${props.isShow ? 'close' : 'open'}`}
                    onClick={props.drowdownContent}
                  >
                  </div>
                )}
                Content={(props) => (
                  <div className="followersTrades">
                    <div className="curTitle">Followers copy trades from this leader trade:</div>
                    {tsFollowersTrades.map(curFollowerTrade => renderTradeFollower(curFollowerTrade, 'followerTrade'))}
                  </div>
                )}
              />
            )}
          </div>
        );

        return index < quantityLeaderOrdersShow;
      });

    console.log({
      arrAllOrders,
    });

    return(
      <div className="tradeItemsParent">
        <div className="item headTable">
          <div className="boxOfTrade emptySpace" style={{flex:0.3}}></div>
          <div className="boxOfTrade pair">Pair</div>
          <div className="boxOfTrade type">Type</div>
          <div className="boxOfTrade side">Side</div>
          <div className="boxOfTrade price">Price</div>
          <div className="boxOfTrade quantity">Quantity</div>
          <div className="boxOfTrade status">Status</div>
          <div className="boxOfTrade time">Time</div>
        </div>
        <div className="boxOfDay">
          <div className="titleDay">2019/07/08</div>
          <div className="curTradeParent opened">
            <div className="item leaderTrade">
              <div className="boxOfTrade clickMore">
                <div className="curClick"></div>
              </div>
              <div className="boxOfTrade emptySpace" style={{flex:.1}}></div>
              <div className="boxOfTrade relativitySuccess">2/2</div>
              <div className="boxOfTrade pair">BNBBTC</div>
              <div className="boxOfTrade type">LIMIT</div>
              <div className="boxOfTrade side">SELL</div>
              <div className="boxOfTrade price">0.028</div>
              <div className="boxOfTrade quantity">5342.1223452345</div>
              <div className="boxOfTrade status">OPEN</div>
              <div className="boxOfTrade time">13:30:32</div>
            </div>
            <div className="item followerTrade">
              <div className="boxOfTrade emptySpace" style={{flex:.2}}></div>
              <div className="boxOfTrade name">EXAMPLE</div>
              <div className="boxOfTrade line">
                <div className="tsLine"></div>
              </div>
              <div className="boxOfTrade price">0.028</div>
              <div className="boxOfTrade quantity">5342.1223452345</div>
              <div className="boxOfTrade status">OPEN</div>
              <div className="boxOfTrade time">13:30:32</div>
            </div>
            <div className="item followerTrade">
              <div className="boxOfTrade emptySpace" style={{flex:.2}}></div>
              <div className="boxOfTrade name">EXAMPLE</div>
              <div className="boxOfTrade line">
                <div className="tsLine"></div>
              </div>
              <div className="boxOfTrade price">0.028</div>
              <div className="boxOfTrade quantity">5342.1223452345</div>
              <div className="boxOfTrade status">OPEN</div>
              <div className="boxOfTrade time">13:30:32</div>
            </div>
          </div>
          <div className="curTradeParent">
            <div className="item leaderTrade">
              <div className="boxOfTrade clickMore">
                <div className="curClick"></div>
              </div>
              <div className="boxOfTrade emptySpace" style={{flex:.1}}></div>
              <div className="boxOfTrade relativitySuccess">2/2</div>
              <div className="boxOfTrade pair">BNBBTC</div>
              <div className="boxOfTrade type">LIMIT</div>
              <div className="boxOfTrade side">SELL</div>
              <div className="boxOfTrade price">0.028</div>
              <div className="boxOfTrade quantity">5342.1223452345</div>
              <div className="boxOfTrade status">OPEN</div>
              <div className="boxOfTrade time">13:30:32</div>
            </div>
          </div>
        </div>
        {/*jsxListOrders*/}
      </div>
    );
  }

  showMoreTrade = () => {
    const { quantityLeaderOrdersShow } = this.state;

    this.setState({
      quantityLeaderOrdersShow: quantityLeaderOrdersShow + 2,
    })
  }

  render() {
    return(
      <div className="logTrades">
        {this.renderGroupOrdersList()}
        <div className="moreTrades" onClick={this.showMoreTrade}>Show more trades</div>
      </div>
    ); 
  }
};
