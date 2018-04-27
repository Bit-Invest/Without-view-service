import React from 'react';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Button } from '@components/registration/Forms/Button/button';

const ROOT_CLASS = 'trader-card';

export const TraderCard = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__exchange`}>{props.exchange}</div>
      <div className={`${ROOT_CLASS}__icon-user-border`}>
        <IconUser />
      </div>
      <div className={`${ROOT_CLASS}__user-name-block`}>
        <UserName name='Ivan' surname='Ivanov' />
      </div>
      <div className={`${ROOT_CLASS}__rating`}>
        Rating:
        <div className={`${ROOT_CLASS}__full-circle`} />
        <div className={`${ROOT_CLASS}__full-circle`} />
        <div className={`${ROOT_CLASS}__full-circle`} />
        <div className={`${ROOT_CLASS}__full-circle`} />
        <div className={`${ROOT_CLASS}__full-circle`} />
        <div className={`${ROOT_CLASS}__full-circle`} />
        <div className={`${ROOT_CLASS}__full-circle`} />
        <div className={`${ROOT_CLASS}__full-empty`} />
        <div className={`${ROOT_CLASS}__full-empty`} />
        <div className={`${ROOT_CLASS}__full-empty`} />
      </div>
      <div className={`${ROOT_CLASS}__position-trade`}>
        <div className={`${ROOT_CLASS}__position-trade-block`}>
          <div>Horizon</div>
          <div>LONG</div>
        </div>
        <div className={`${ROOT_CLASS}__position-trade-block`}>
          <div>Fees</div>
          <div>10%</div>
        </div>
        <div className={`${ROOT_CLASS}__position-trade-block`}>
          <div>Investors</div>
          <div>167</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__result-block`}>
        <div className={`${ROOT_CLASS}__result-block-data`} >
          <div className={`${ROOT_CLASS}__block-data`}>Month</div>
          <div className={`${ROOT_CLASS}__block-result`}>174%</div>
        </div>
        <div className={`${ROOT_CLASS}__result-block-data`}>
          <div className={`${ROOT_CLASS}__block-data`}>Today</div>
          <div className={`${ROOT_CLASS}__block-result`}>215%</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__info-block`}>
        Lorem Ipsum has been the industry's standard dummy text ever since
        Read more...
      </div>
      <div className={`${ROOT_CLASS}__button-block`}>
        <Button theme="theme-gradient" NameBtn="Connect" />
        <Button NameBtn="Compare" />
      </div>
    </div>
  );
};
