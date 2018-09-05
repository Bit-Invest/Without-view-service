import * as React from 'react';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Rating } from '@components/marketplace/Rating/Rating';
import { PercentResult } from '@common/PercentResult';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'card-list';

export const TraderCardList = props => {
  return(
    <div onClick={props.onClick} className={ROOT_CLASS}>
      <div>
        <div className={`${ROOT_CLASS}__exchange`}>{props.stockName}</div>
        <div className={`${ROOT_CLASS}__graf-list`}></div>
      </div>
      <div className={`${ROOT_CLASS}__position-result-block`}>
        <div className={`${ROOT_CLASS}__result-block`}>
          <div className={`${ROOT_CLASS}__result`}>{ objectLangs[lng]['TraderCardList#1'] }
            <PercentResult count={-21} size="small" />
          </div>
          <div className={`${ROOT_CLASS}__result`}>{ objectLangs[lng]['TraderCardList#2'] }
            <PercentResult count={10} size="small" />
          </div>
          <div className={`${ROOT_CLASS}__result`}>{ objectLangs[lng]['TraderCardList#3'] }
            <PercentResult count={8} size="small" />
          </div>
        </div>
        <div className={`${ROOT_CLASS}__position`}>
          <div className={`${ROOT_CLASS}__position-result`}>{ objectLangs[lng]['TraderCardList#4'] }</div>
          <div className={`${ROOT_CLASS}__position-result`}>{ objectLangs[lng]['TraderCardList#5'] }</div>
          <div className={`${ROOT_CLASS}__position-result`}>{ objectLangs[lng]['TraderCardList#6'] }</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__user-block`}>
        <IconUser />
        <div>
          <div className={`${ROOT_CLASS}__user-name-block`}>
            <UserName
              name={props.name}
              surname={`${props.surname[0]}.`}
              theme='MarketPlaceName'
            />
          </div>
          <div className={`${ROOT_CLASS}__rating-block`}>
            <Rating rating={5}/>
          </div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__save-block`}></div>
    </div>
  )
}
