import * as React from 'react';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Rating } from '@components/marketplace/Rating/Rating';
import { Link } from 'react-router-dom';
import { PercentResult } from '@common/PercentResult';

const ROOT_CLASS = 'trader-card';

export const TraderCard = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__block-exchange`}>
        <div className={`${ROOT_CLASS}__exchange`}>{props.exchange}</div>
        <div className={`${ROOT_CLASS}__currencyPair`}>BTC/ETH</div>
        <div className={`${ROOT_CLASS}__save-block`}></div>
      </div>
      <div className={`${ROOT_CLASS}__graf`}></div>
      <div className={`${ROOT_CLASS}__result-block`}>
        <div className={`${ROOT_CLASS}__result-block-data`} >
          <div className={`${ROOT_CLASS}__block-data`}>Week &nbsp;</div>
          <PercentResult count={17} size="small" />
        </div>
        <div className={`${ROOT_CLASS}__result-block-data`}>
          <div className={`${ROOT_CLASS}__block-data`}>Month &nbsp;</div>
          <PercentResult count={-21} size="small" />
        </div>
      </div>
      <div className={`${ROOT_CLASS}__position-trade`}>
        <div className={`${ROOT_CLASS}__position-trade-block`}>
          <div>Horizon</div>
          <div className={`${ROOT_CLASS}__dynamic-info`}>LONG</div>
        </div>
        <div className={`${ROOT_CLASS}__position-trade-block`}>
          <div>Fees</div>
          <div className={`${ROOT_CLASS}__dynamic-info`}>10%</div>
        </div>
        <div className={`${ROOT_CLASS}__position-trade-block`}>
          <div>Investors</div>
          <div className={`${ROOT_CLASS}__dynamic-info`}>167</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__user-block`}>
        <IconUser />
        <div>
          <div className={`${ROOT_CLASS}__user-name-block`}>
            <UserName name='Ivan' surname='I.' theme='MarketPlaceName' />
          </div>
          <div className={`${ROOT_CLASS}__rating-block`}>
            <Rating rating={5}/>
          </div>
        </div>
      </div>

      <div className={`${ROOT_CLASS}__button-block`}>
        <Link to={`/product/${props.id}`}>
        </Link>
      </div>
    </div>
  );
};
