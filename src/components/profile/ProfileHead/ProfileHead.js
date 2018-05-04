import React from 'react';
import { IconUser } from '@profile/IconUser';
import { UserName } from '@profile/UserName';
import { Button } from '@components/common/Button';
import { Rating } from '@components/marketplace/Rating';

const ROOT_CLASS = 'profile-block';

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__profile-head`}>
        <div className={`${ROOT_CLASS}__user-info`}>
            <div className={`${ROOT_CLASS}__icon-user-border`}>
              <IconUser />
            </div>
          <div>
            <UserName name='Ivan' surname='Ivanov' />
            <div className={`${ROOT_CLASS}__rating-block`}>
              <div className={`${ROOT_CLASS}__investor`}>Investor &nbsp; /</div>
              <Rating rating={7} />
            </div>
            <div className={`${ROOT_CLASS}__kyc-block`}>
              <div className={`${ROOT_CLASS}__kyc-img`} />
              <div className={`${ROOT_CLASS}__kyc`}>KYC Approved</div>
            </div>
            <div />
          </div>
        </div>
        <div className={`${ROOT_CLASS}__btn-block`}>
          <div className={`${ROOT_CLASS}__get-bonus-block`}>
            <div className={`${ROOT_CLASS}__get-bonus`}>
              Share and Get a Bonus
            </div>
            <div className={`${ROOT_CLASS}__get-bonus-img`}></div>
          </div>
          <div className={`${ROOT_CLASS}__button-block`}>
            <Button theme="theme-gradient" NameBtn="Connect" />
            <Button NameBtn="Compare" />
          </div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__hr`}></div>
    </div>
  );
};
