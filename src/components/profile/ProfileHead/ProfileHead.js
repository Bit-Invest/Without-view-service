import React from 'react';
import { IconUser } from '../IconUser/IconUser';
import { UserName } from '../UserName/UserName';
import { Button } from '@components/registration/Forms/Button/button';

const ROOT_CLASS = 'profile-head';

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__user-info`}>
        <div className={`${ROOT_CLASS}__profile-head`}>
          <div className={`${ROOT_CLASS}__icon-user-border`}>
            <IconUser />
          </div>
        </div>
        <div>
          <UserName />
          <div className={`${ROOT_CLASS}__rating-block`}>
            <div>Investor / </div>
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
          <div />
          <div className={`${ROOT_CLASS}__get-bonus-img`} />
        </div>
        <div className={`${ROOT_CLASS}__button-block`}>
          <Button theme="theme-gradient" NameBtn="Connect" />
          <Button NameBtn="Compare" />
        </div>
      </div>
    </div>
  );
};
