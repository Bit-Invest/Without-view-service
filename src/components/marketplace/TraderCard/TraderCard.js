import * as React from 'react';
import { Utils } from '@common/Utils';
import { User } from '@common/User';
import { Unit } from '@common/Unit';
import { TraderStat } from '@marketplace/TraderStat';
import { StockAreaChart } from '@common/StockAreaChart';
import { connect } from 'react-redux';

const ROOT_CLASS = 'trader-card';

const TraderCard = props => {
  const card = props.products.filter(el => el.id === props.id)
  let raiting = 0
  let comment = 0
  let week = 0
  let month = 0
  if (card.length > 0) {
    raiting = card[0].raitingTrader !== undefined ? card[0].raitingTrader.raiting : 0
    comment = card[0].raitingTrader !== undefined ? card[0].raitingTrader.comment : 0
    week = card[0].statesTrader !== undefined ? card[0].statesTrader.week : 0
    month = card[0].statesTrader !== undefined ? card[0].statesTrader.month : 0
  }
  
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${props.theme ? ROOT_CLASS + '_' + props.theme : ''}`;
  }
  const renderStock = () => {
    return props.history[props.id] && props.history[props.id].length > 2 ?
      (<StockAreaChart
        width={445}
        height={157}
        type="hybrid"
        zoom={false}
        data={props.history[props.id]}
        name={props.name}
        id={props.id}
      />) :
      null;
  }
  const buildWeekMonth = () => {
    return (
      <div className={`${ROOT_CLASS}__units`}>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit title="week" count={week} size="market" />
        </div>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit title="month" count={month} size="market" />
        </div>
      </div>
    )
  }
  return (
    <div className={buildRootClass()} onClick={props.onClick ? props.onClick : () => {}}>
      <div className={`${ROOT_CLASS}__header`}>
        <div className={`${ROOT_CLASS}__user-block`}>
          <User
            name={props.name}
            surname={props.surname}
            positionID={props.positionID}
            imageSrc={`${props.name.toUpperCase()}_${props.surname.toUpperCase()}`}
            theme="small"
            role="Trader"
            raiting={raiting}
            comment={comment}
          />
        </div>
        <div className={`${ROOT_CLASS}__saved ${ROOT_CLASS}__saved_${props.saved ? 'saved' : 'unsaved'}`}></div>
      </div>
      <div className={`${ROOT_CLASS}__title`}>
        {props.nameProduct ? props.nameProduct : ''}
      </div>
      <div className={`${ROOT_CLASS}__exchanges`}>
        <div className={`${ROOT_CLASS}__exchange`}>{props.stockName}</div>
        <div className={`${ROOT_CLASS}__pair`}>BTC</div>
      </div>
      <div className={`${ROOT_CLASS}__chart-wrap ${props.isLoaded ? ROOT_CLASS + '__chart-wrap_loaded' : ''}`}>
        <div className={`${ROOT_CLASS}__preloader`}/>
        <div className={`${ROOT_CLASS}__chart`}>
          {renderStock()}
        </div>
      </div>
      { buildWeekMonth() }
      <div className={`${ROOT_CLASS}__delimiter`}/>
      <div className={`${ROOT_CLASS}__stats`}>
        <TraderStat name="Horizon" value={props.horizon}/>
        <TraderStat name="Fees" value={props.fees}/>
        <TraderStat name="Investors" value={props.followersCount} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    products: state.marketplace.products
  };
}

const connectedContainer =
  connect(mapStateToProps)(TraderCard);

export {connectedContainer as TraderCard};