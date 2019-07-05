import React from 'react';

import mixins from '@cdx/mixins/';
import DrowDown from '@cdx/jsx/common/drowdown/';

import './style.scss';

class ActiveInvestor extends React.Component {
  renderBalances = ({reload}) => {
    const { balances, reduxState: { _id } } = this.props;
    const noLoadedBalances = mixins.common.dataNoLoaded([balances]);

    if (noLoadedBalances[1]) return [
      <div onClick={reload}>Reload</div>,
      noLoadedBalances[1],
    ];

    const tsBalances = typeof balances === 'object' && balances;
    const tsFollowingBalances = (tsBalances || [])
      .find(curBalances => curBalances.followingId === _id);

    if (!Object.keys(tsFollowingBalances).length) return(
      <div>
        <div onClick={reload}>Reload</div>
        <div>Error, trim balances.</div>
      </div>
    );

    const {
      followerBalance,
      followerTotal,
      leaderBalance,
      leaderTotal,
    } = tsFollowingBalances;

    const renderTotalBalances = (dataObj) => {
      const keysData = (Object.keys(dataObj || {}) || [])
        .filter(curObjBalance => dataObj[curObjBalance].available > 0 || dataObj[curObjBalance].hold > 0);

      console.log({keysData});

      const resList = keysData.map((curProperyCoin, index) => {
        const tsDataBalance = dataObj[curProperyCoin];

        return(
          <div className="curItem" key={index}>
            <div className="coin">{curProperyCoin}:</div>
            <div className="value">
              {tsDataBalance.available}, {tsDataBalance.hold}
            </div>
          </div>
        );
      });

      return resList;
    }; 

    const renderCoinBalances = (dataObj) => {
      const keysData = (Object.keys(dataObj || {}) || [])
        .filter(curObjBalance => dataObj[curObjBalance][0] > 0 || dataObj[curObjBalance][1] > 0);

      const resList = keysData.map((curProperyCoin, index) => {
        const tsDataBalance = dataObj[curProperyCoin];

        return(
          <div className="curItem" key={index}>
            <div className="coin">{curProperyCoin}:</div>
            <div className="value">
              {tsDataBalance[0]}, {tsDataBalance[1]}
            </div>
          </div>
        );
      });

      return resList;
    }; 

    return(
      <div className="balancesMyProductFollowing">
        <div onClick={reload}>Reload</div>
        <div className="list">
          <div className="curItem">
            <div className="curTitle">Leader</div>
            <div className="curContent">
              <div className="curTitle">Total</div>
              <div className="curList">
                {renderTotalBalances(leaderTotal)}
              </div>
            </div>
            <div className="curContent">
              <div className="curTitle">Coins</div>
              <div className="curList">
                {renderCoinBalances(leaderBalance)}
              </div>
            </div>
          </div>
          <div className="curItem">
            <div className="curTitle">Follower</div>
            <div className="curContent">
              <div className="curTitle">Total</div>
              <div className="curList">
                {renderTotalBalances(followerTotal)}
              </div>
            </div>
            <div className="curContent">
              <div className="curTitle">Coins</div>
              <div className="curList">
                {renderCoinBalances(followerBalance)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      reduxState: {
        followerDetails: { firstName, lastName },
        nameFollower,
        moderation,
        createdAt,
        follower,
        frozen,
        _id,
        qualityUpdatedAt,
        quality,
        followerValidity,
        mode,
      },
      balances,
    } = this.props;
    
    return(
      <div className="investorComponent">
        <div className="option">
          <div className="property">Investor:</div> 
          <div className="value">{nameFollower}</div>
        </div>
        <div className="option">
          <div className="property">Balance synchronization quality:</div> 
          <div className="value">{(quality || 0).toFixed(2)}%</div>
        </div>
        <DrowDown 
          Head={(props) => (
            <div className="option">
              <div className="property" onClick={() => {
                if (!props.isShow) {
                  this.props.methods.getBalanceByFollowing({
                    followingId: this.props.reduxState._id,
                  });
                }

                props.drowdownContent();
              }}>Balances:</div> 
            </div>
          )}
          Content={(props) => {
            return this.renderBalances({
              reload: this.props.methods.getBalanceByFollowing.bind(this, {
                followingId: this.props.reduxState._id,
              }),
            });
          }}
        />
        <DrowDown 
          Head={(props) => (
            <div className="option">
              <div className="property" onClick={props.drowdownContent}>More info:</div> 
            </div>
          )}
          Content={() => (
            <div>
              <div>Moderation: {moderation}</div>
              <div>CreatedAt: {createdAt}</div>
              <div>Frozen: {frozen.toString()}</div>
              <div>mode: {mode}</div>
            </div>
          )}
        />
        <DrowDown 
          Head={(props) => (
            <div className="option">
              <div className="property" onClick={props.drowdownContent}>Actions this following:</div> 
            </div>
          )}
          Content={() => (
            <div className="actions">
              <div className="btn" onClick={this.props.methods.setUnFreeze.bind(this, {
                followingId: this.props.reduxState._id,
              })}>SET UNFREEZE</div>
              <div className="btn" onClick={this.props.methods.setFreeze.bind(this, {
                followingId: this.props.reduxState._id,
              })}>SET FREEZE</div>
              <div className="btn" onClick={this.props.methods.getBalanceByFollowing.bind(this, {
                followingId: this.props.reduxState._id,
              })}>GET BALANCES</div>
              <div className="btn" onClick={() => {
                this.props.methods.getOrdersByFollowing({
                  followingId: this.props.reduxState._id,
                })
                setInterval(() => {
                  this.props.methods.getOrdersByFollowing({
                    followingId: this.props.reduxState._id,
                  })
                }, 3000);
              }}>START UPDATING ORDERS</div>
              <div className="btn" onClick={this.props.methods.setFollowingMode.bind(this, {
                followingId: this.props.reduxState._id,
                mode: 'copy',
              })}>SET MODE COPY</div>
              <div className="btn" onClick={this.props.methods.setFollowingMode.bind(this, {
                followingId: this.props.reduxState._id,
                mode: 'rebalance',
              })}>SET MODE REBALANCER</div>
            </div>
          )}
        />
      </div>
    );
  }
};

export default (props) => {
  return <ActiveInvestor {...props} />
};