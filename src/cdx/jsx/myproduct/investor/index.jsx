import React from 'react';
import moment from 'moment';
import configs from '@cdx/configs/';
import { phrases } from '@cdx/utils/common';

import mixins from '@cdx/mixins/';

import './style.scss';

class ActiveInvestor extends React.Component {
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
      commonState,
    } = this.props;

    this.timers['getFollowersWithBalances'] = async (isFirst) => {
      if (!commonState.cdxWindowActive && !isFirst) {
        return setTimeout(this.timers['getFollowersWithBalances'], (
          configs.myproduct.settings.intervalUpdateFollowersSec || 15000
        ));
      }

      await this.props.methods.getBalanceByFollowing({
        followingId: _id,
      })

      await this.props.methods.getFollowers({
        followingId: _id,
      })

      setTimeout(this.timers['getFollowersWithBalances'], (
        configs.myproduct.settings.intervalUpdateFollowersSec || 15000
      ));
    };

    this.timers['getFollowersWithBalances'](1);
  }

  componentWillUnmount() {
    Object.keys(this.timers).forEach((curKeyTimer) =>
      this.timers[curKeyTimer] = () => {}
    );
  }

  onChangeStatus = async (event) => {
    const { _id, } = this.props.reduxState;
    const { setFreeze, setUnFreeze, setFollowingMode, } = this.props.methods;
    const selectedValue = event.target.value;

    if (selectedValue === 'frozen') {
      return await setFreeze({ followingId: _id, });
    }

    await setFollowingMode({ followingId: _id, mode: selectedValue, });
    await setUnFreeze({ followingId: _id, });
  }

  getTotalValue = (total) => (
    `${(total.BTC.available + total.BTC.hold).toFixed(5)} BTC | ${(total.USD.available + total.USD.hold).toFixed(2)} USD`
  )

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
      .filter(([coin, [available, hold]]) => {
        const [leaderAvailable, leaderHold] = leaderBalance[coin] || [0, 0];
        const [followerAvailable, followerHold] = followerBalance[coin] || [0, 0];

        const isZero = ([leaderAvailable, leaderHold, followerAvailable, followerHold])
          .some(curValue => curValue > 0);

        return isZero;
      })
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
        <div className="allCoinBalances">
          <div className="betweenItem leaderMainBlock">
            <div className="balancesList">
              <div className="item headItem">
                <div className="curItemCoin">{phrases['myproduct']['#22']}</div>
                <div className="curItemCoin">{phrases['myproduct']['#23']}</div>
                <div className="curItemCoin">{phrases['myproduct']['#24']}</div>
                <div className="curItemCoin">{phrases['myproduct']['#25']}</div>
              </div>
              {jsxListCoins.leader}
            </div>
          </div>
          <div className="betweenItem followerMainBlock">
            <div className="balancesList">
              <div className="item headItem">
                <div className="curItemCoin">{phrases['myproduct']['#22']}</div>
                <div className="curItemCoin">{phrases['myproduct']['#23']}</div>
                <div className="curItemCoin">{phrases['myproduct']['#24']}</div>
                <div className="curItemCoin">{phrases['myproduct']['#25']}</div>
              </div>
              {jsxListCoins.follower}
            </div>
          </div>
        </div>
        <div className="footBalances">
          <div className="totalBalances">
            <div className="curPropery">{phrases['myproduct']['#26']}</div>
            <div className="curValue">{this.getTotalValue(leaderTotal)}</div>
          </div>
          <div className="totalBalances">
            <div className="curPropery">{phrases['myproduct']['#27']}</div>
            <div className="curValue">{this.getTotalValue(followerTotal)}</div>
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

    const activeStatus = frozen ? 'frozen' : mode;
    const createdDate = moment.utc(createdAt).toISOString().slice(0, 10);
    const synchronizationQuality = (quality > 0 ? quality : 0).toFixed(2);

    return(
      <div className="investorComponent">
        <div className="mainBlock">
          <div className="headProperty">
            <div className="item name">{phrases['myproduct']['#28']}</div>
            <div className="item status">{phrases['myproduct']['#29']}</div>
            <div className="item totalBalance">{phrases['myproduct']['#30']}</div>
            <div className="item synchronization">{phrases['myproduct']['#31']}</div>
            <div className="item date">{phrases['myproduct']['#32']}</div>
          </div>
          <div className="centerValue">
            <div className="item name">{nameFollower}</div>
            <div className="item status">
              <select onChange={this.onChangeStatus} value={activeStatus}>
                <option value="none" selected={activeStatus === 'none'}>...</option>
                <option value="copy" selected={activeStatus === 'copy'}>{phrases['myproduct']['#33']}</option>
                <option value="rebalance" selected={activeStatus === 'rebalance'}>{phrases['myproduct']['#34']}</option>
                <option value="frozen" selected={activeStatus === 'frozen'}>{phrases['myproduct']['#35']}</option>
              </select>
            </div>
            <div className="item totalBalance">{this.getTotalValue(followerTotal)}</div>
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
            })}>{phrases['myproduct']['#37']}</div>
            <div className="item unsubscribe" onClick={this.props.methods.sendRejectFollowing.bind(this, {
              followingId: _id,
            })}>{phrases['myproduct']['#36']}</div>
          </div>
        </div>
        {this.state.isShowBalances && this.renderBalances()}
      </div>
    );
  }
};

export default (props) => {
  return <ActiveInvestor {...props} />
};
