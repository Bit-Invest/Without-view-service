import * as React from 'react';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Rating } from '@components/marketplace/Rating/Rating';
import { PercentResult } from '@common/PercentResult';
import { Line } from 'react-chartjs-2';
import { Utils } from '@common/Utils';
import { User } from '@common/User';
import { Unit } from '@common/Unit';
import { TraderStat } from '@marketplace/TraderStat';

const ROOT_CLASS = 'trader-card';

export const TraderCard = props => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${props.theme ? ROOT_CLASS + '_' + props.theme : ''}`;
  }

  return (
    <div className={buildRootClass()} onClick={props.onClick}>
      <div className={`${ROOT_CLASS}__header`}>
        <div className={`${ROOT_CLASS}__user-block`}>
          <User name={props.name} surname={props.surname} theme="small" role="Trader" />
        </div>
        <div className={`${ROOT_CLASS}__saved ${ROOT_CLASS}__saved_${props.saved ? 'saved' : 'unsaved'}`}></div>
      </div>
      <div className={`${ROOT_CLASS}__title`}>
        {props.title ? props.title : ''}
      </div>
      <div className={`${ROOT_CLASS}__exchanges`}>
        <div className={`${ROOT_CLASS}__exchange`}>{props.nameStor}</div>
        <div className={`${ROOT_CLASS}__pair`}>BTC/ETH</div>
      </div>
      <div className={`${ROOT_CLASS}__chart`}/>
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
        <TraderStat name="Horizon" value="Long" />
        <TraderStat name="Fees" value="10%" />
        <TraderStat name="Investors" value={props.followersCount} />
      </div>
    </div>
  );
};
