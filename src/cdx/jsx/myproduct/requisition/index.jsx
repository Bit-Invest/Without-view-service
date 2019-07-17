import React from 'react';
import moment from 'moment';

import mixins from '@cdx/mixins/';

import './style.scss';

const RejectRequisition = (props) => {
  const {
    reduxState: {
      moderation,
      nameFollower
    },
  } = props;


  return(
    <div className="requisitionComponent rejected">
      <div className="text">{`You canceled an application from ${nameFollower}, moderation: ${moderation}.`}</div>
    </div>
  );
};

const getTotalValue = (total) => (
  `${(total.BTC.available + total.BTC.hold).toFixed(5)} BTC | ${(total.USD.available + total.USD.hold).toFixed(2)} USD`
);

class WaitRequisition extends React.Component {
  constructor() {
    super();

    this.state = {
      isShowBalances: false,
    };
    this.timers = [];
  }

  componentWillMount() {
    const {
      reduxState: {
        _id,
      },
    } = this.props;

    this.props.methods.getBalanceByFollowing({
      followingId: _id,
    });
  }

  componentWillUnmount() {
    this.timers.forEach(curTimer =>
      clearInterval(curTimer)
    );

    this.timers = [];
  }

  renderBalances = () => {
    const { balances, reduxState: { _id } } = this.props;
    const noLoadedBalances = mixins.common.dataNoLoaded([balances]);

    if (noLoadedBalances[1]) return [
      noLoadedBalances[1],
    ];

    const tsBalances = typeof balances === 'object' && balances;
    const tsFollowingBalances = (tsBalances || [])
      .find(curBalances => curBalances.followingId === _id);

    if (!tsFollowingBalances || !Object.keys(tsFollowingBalances).length) return(
      <div>
        <div>Error, trim balances.</div>
      </div>
    );

    const {
      followerBalance,
      followerTotal,
      leaderBalance,
      leaderTotal,
    } = tsFollowingBalances;

    const jsxListCoins = {
      leader: [],
      follower: [],
    };

    Object.entries({
      ...leaderBalance,
      ...followerBalance,
    })
      .filter(([coin, [available, hold]]) => available > 0 || hold > 0)
      .forEach(([coin]) => {
        const [leaderAvailable, leaderHold] = leaderBalance[coin] || [0, 0];
        const [followerAvailable, followerHold] = followerBalance[coin] || [0, 0];

        jsxListCoins.leader.push(
          <div className="item">
            <div className="curItemCoin">{coin}</div>
            <div className="curItemCoin">{leaderAvailable}</div>
            <div className="curItemCoin">{leaderHold}</div>
            <div className="curItemCoin">{leaderAvailable + leaderHold}</div>
          </div>
        );

        jsxListCoins.follower.push(
          <div className="item">
            <div className="curItemCoin">{coin}</div>
            <div className="curItemCoin">{followerAvailable}</div>
            <div className="curItemCoin">{followerHold}</div>
            <div className="curItemCoin">{followerAvailable + followerHold}</div>
          </div>
        );
      });

    return(
      <div className="balancesBlock">
        <div className="betweenItem leaderMainBlock">
          <div className="balancesList">
            <div className="item headItem">
              <div className="curItemCoin">Symbol</div>
              <div className="curItemCoin">Available</div>
              <div className="curItemCoin">In Order</div>
              <div className="curItemCoin">Total</div>
            </div>
            {jsxListCoins.leader}
          </div>
          <div className="totalBalances">
            <div className="curPropery">Leader</div>
            <div className="curValue">{getTotalValue(leaderTotal)}</div>
          </div>
        </div>
        <div className="betweenItem followerMainBlock">
          <div className="balancesList">
            <div className="item headItem">
              <div className="curItemCoin">Symbol</div>
              <div className="curItemCoin">Available</div>
              <div className="curItemCoin">In Order</div>
              <div className="curItemCoin">Total</div>
            </div>
            {jsxListCoins.follower}
          </div>
          <div className="totalBalances">
            <div className="curPropery">Follower</div>
            <div className="curValue">{getTotalValue(followerTotal)}</div>
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    const {
      reduxState: {
        nameFollower,
        moderation,
        createdAt,
        follower,
        frozen,
        _id,
        quality,
        mode,
      },
      balances,
    } = this.props;

    const tsBalances = typeof balances === 'object' && balances;
    const tsFollowingBalances = (tsBalances || [])
      .find(curBalances => curBalances.followingId === _id);

    const {
      followerTotal,
    } = tsFollowingBalances || {
      followerTotal: {
        BTC: { available: 0, hold: 0, },
        USD: { available: 0, hold: 0, },
      },
    };

    const createdDate = moment.utc(createdAt).toISOString().slice(0, 10);
    const synchronizationQuality = (quality > 0 ? quality : 0).toFixed(2);
    
    return(
      <div className="requisitionComponent">
        <div className="mainBlock">
          <div className="headProperty">
            <div className="item name">Name</div>
            <div className="item totalBalance">Total Ballance</div>
            <div className="item synchronization">Synchronization quality</div>
            <div className="item date">Date of requisition</div>
          </div>
          <div className="centerValue">
            <div className="item name">{nameFollower}</div>
            <div className="item totalBalance">{getTotalValue(followerTotal)}</div>
            <div className="item synchronization">
              <div className="justValue">{synchronizationQuality}%</div>
              <div className="ranger">
                <div className={`filled ${synchronizationQuality<70?'badly':'good'}`} style={{flex: (synchronizationQuality/100)}}></div>
              </div>
            </div>
            <div className="item date">{createdDate}</div>
          </div>
          <div className="clickButtons">
            <div className="item compare" onClick={()=>this.setState({
              isShowBalances: !this.state.isShowBalances,
            })}>Compare balance</div>
            <div className="rigthBtns">
              <div className="item approve" onClick={this.props.methods.sendApproveFollowing.bind(this, {
                followingId: _id,
              })}>Approve</div>
              <div className="item remove" onClick={this.props.methods.sendRejectFollowing.bind(this, {
                followingId: _id,
              })}>Remove</div>
            </div>
          </div>
        </div>
        {this.state.isShowBalances && this.renderBalances()}
      </div>
    );
  }
}

export default (props) => {
  const { status } = props;
  const StatusBlock = {
    'wait': WaitRequisition,
    'reject': RejectRequisition,
  }[status];

  return <StatusBlock {...props} />
};