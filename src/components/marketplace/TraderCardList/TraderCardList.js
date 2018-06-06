import * as React from 'react';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Rating } from '@components/marketplace/Rating/Rating';

const ROOT_CLASS = 'card-list';

export const TraderCardList = props => {
  return(
    <div className={ROOT_CLASS}>
      <div>
        <div className={`${ROOT_CLASS}__exchange`}>{props.exchange}</div>
        <div className={`${ROOT_CLASS}__graf-list`}></div>
      </div>
      <div className={`${ROOT_CLASS}__position-result-block`}>
        <div className={`${ROOT_CLASS}__result-block`}>
          <div className={`${ROOT_CLASS}__result`}>Week <span className={`${ROOT_CLASS}__result-span-plus`} >{props.resultWeek} +32%</span></div>
          <div className={`${ROOT_CLASS}__result`}>Month <span className={`${ROOT_CLASS}__result-span-minus`} >{props.resultMonth} -15%</span></div>
          <div className={`${ROOT_CLASS}__result`}>6 Months <span className={`${ROOT_CLASS}__result-span-minus`} >{props.result6Month} -15%</span></div>
        </div>
        <div className={`${ROOT_CLASS}__position`}>
          <div className={`${ROOT_CLASS}__position-result`}>Horizon  LONG</div>
          <div className={`${ROOT_CLASS}__position-result`}>Fees  10%</div>
          <div className={`${ROOT_CLASS}__position-result`}>Investors  167</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__user-block`}>
        <IconUser />
        <div>
          <div className={`${ROOT_CLASS}__user-name-block`}>
            <UserName name='John' surname='S.' theme='MarketPlaceName' />
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
