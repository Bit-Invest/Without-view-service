import React from 'react';
import moment from 'moment';
import configs from '@cdx/configs/';

export default class CurTradeParent extends React.Component {
  constructor() {
    super();

    this.state = {
      displayedFollowers: false,
    };
  }

  renderTradeLeader = (trade, hasLogTrades, drowdownContent, relativitySuccess) => (
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
      <div className={`boxOfTrade status ${trade.status}`}>
        {(configs.myproduct.statusesShowing[trade.status] || trade.status)}
      </div>
      <div className="boxOfTrade time">{moment.utc(trade.createdAt).toISOString().slice(11, 19)}</div>
    </div>
  );

  renderTradeFollower = (trade) => (
    <div className="item followerTrade" key={`${trade.orderId}-${trade.symbol}`}>
      <div className="boxOfTrade emptySpace" style={{width: '10%'}}></div>
      <div className="boxOfTrade name">{trade.name}</div>
      <div className="boxOfTrade emptySpace" style={{width: '2%'}}></div>
      <div className="boxOfTrade line">
        <div className="tsLine"></div>
      </div>
      <div className="boxOfTrade price">{trade.price}</div>
      <div className="boxOfTrade quantity">{trade.quantity}</div>
      <div className={`boxOfTrade status ${trade.status}`}>{(configs.myproduct.statusesShowing[trade.status] || trade.status)}</div>
      <div className="boxOfTrade time">{moment.utc(trade.createdAt).toISOString().slice(11, 19)}</div>
    </div>
  );

  renderTradeFollowerNoFollow = (trade) => (
    <div className="item followerTrade" key={`${trade.orderId}-${trade.symbol}`}>
      <div className="boxOfTrade emptySpace" style={{width: '10%'}}></div>
      <div className="boxOfTrade name">{trade.name}</div>
      <div className="boxOfTrade emptySpace" style={{width: '2%'}}></div>
      <div className="boxOfTrade line" style={{width:'50%'}}>
        <div className="tsLine"></div>
      </div>
      <div className={`boxOfTrade status ${trade.status}`}>{(configs.myproduct.statusesShowing[trade.status] || trade.status)}</div>
      <div className="boxOfTrade time">{moment.utc(trade.createdAt).toISOString().slice(11, 19)}</div>
    </div>
  );

  drowdownContent = () => {
    const { displayedFollowers } = this.state;

    this.setState({
      displayedFollowers: !displayedFollowers,
    });
  }

  render() {
    const { curLeaderOrder, hasLogTrades, relativitySuccess, tsFollowersTrades, tsLogTradesNoCopied } = this.props;
    const { displayedFollowers } = this.state;

    return(
      <div className={`curTradeParent ${displayedFollowers?'opened':null}`}>
        {this.renderTradeLeader(curLeaderOrder, hasLogTrades, this.drowdownContent, relativitySuccess)}
        {hasLogTrades && (
          <div className="tsFollowersTrades">
            {tsFollowersTrades.map(curFollowerTrade => this.renderTradeFollower(curFollowerTrade))}
            {tsLogTradesNoCopied.map(curFollowerTrade => this.renderTradeFollowerNoFollow(curFollowerTrade))}
          </div>
        )}
      </div>
    );
  }
};
