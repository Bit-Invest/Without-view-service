import * as React from 'react';
import { Utils } from '@common/Utils';
import { User } from '@common/User';
import { Unit } from '@common/Unit';
import { TraderStat } from '@marketplace/TraderStat';
import { StockAreaChart } from '@common/StockAreaChart';

const ROOT_CLASS = 'trader-card';

export const TraderCard = props => {
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
  return (
    <div className={buildRootClass()} onClick={props.onClick ? props.onClick : () => {}}>
      <div className={`${ROOT_CLASS}__header`}>
        <div className={`${ROOT_CLASS}__user-block`}>
          <User
            name={props.name}
            surname={props.surname}
            positionID={props.positionID}
            theme="small"
            role="Trader"
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
      <div className={`${ROOT_CLASS}__units`}>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit title="week" count={32} size="market" />
        </div>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit title="month" count={-15} size="market" />
        </div>
      </div>
      <div className={`${ROOT_CLASS}__delimiter`}/>
      <div className={`${ROOT_CLASS}__stats`}>
        <TraderStat name="Horizon" value="Long" className={`${Utils.UNDEVELOPED}`}/>
        <TraderStat name="Fees" value="10%" className={`${Utils.UNDEVELOPED}`}/>
        <TraderStat name="Investors" value={props.followersCount} />
      </div>
    </div>
  );
};
