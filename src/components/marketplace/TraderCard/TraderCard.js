import React from 'react';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Button } from '@components/registration/Forms/Button/button';
import { Rating } from '@components/marketplace/Rating/Rating';

const ROOT_CLASS = 'trader-card';

export const TraderCard = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__exchange`}>{props.exchange}</div>
      <div className={`${ROOT_CLASS}__icon-user-border`}>
        <IconUser />
      </div>
      <div className={`${ROOT_CLASS}__user-name-block`}>
        <UserName name='Ivan' surname='Ivanov' theme='MarketPlaceName' />
      </div>
      <div className={`${ROOT_CLASS}__rating-block`}>
        <Rating rating={5}/>
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
      <div className={`${ROOT_CLASS}__result-block`}>
        <div className={`${ROOT_CLASS}__result-block-data`} >
          <div className={`${ROOT_CLASS}__block-data`}>Month &nbsp;</div>
          <div className={`${ROOT_CLASS}__block-result`}>174%</div>
        </div>
        <div className={`${ROOT_CLASS}__result-block-data`}>
          <div className={`${ROOT_CLASS}__block-data`}>Today &nbsp;</div>
          <div className={`${ROOT_CLASS}__block-result`}>215%</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__info-block`}>
        Lorem Ipsum has been the industry's standard dummy text ever since
        <div className={`${ROOT_CLASS}__href`}>Read more...</div>
      </div>
      <div className={`${ROOT_CLASS}__button-block`}>
        <Button theme="theme-gradient" NameBtn="Connect" />
        <Button NameBtn="Compare" />
      </div>
    </div>
  );
};
