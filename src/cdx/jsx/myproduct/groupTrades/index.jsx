import React from 'react';

import DrowDown from '@cdx/jsx/common/drowdown/';

import './style.scss';

export default class GroupTrades extends React.Component {
  constructor() {
    super();

    this.state = {
      quantityLeaderOrdersShow: 2,
    };
  }

  renderTrades = () => {
    const { arrAllOrders } = this.props;
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

    return jsxListOrders;
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
        {this.renderTrades()}
        <div className="moreTrades" onClick={this.showMoreTrade}>Show more trades</div>
      </div>
    ); 
  }
};
