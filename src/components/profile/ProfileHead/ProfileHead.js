import React from 'react';
import { IconUser } from '../IconUser/IconUser';
import { UserName } from '../UserName/UserName';
import { Button } from '@components/registration/Forms/Button/button';
import { ProfileProduct } from '../ProfileProduct/ProfileProduct';

const ROOT_CLASS = 'profile-block';

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__profile-head`}>
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
      <div className={`${ROOT_CLASS}__hr`}></div>
      <div className={`${ROOT_CLASS}__graf`}></div>
      <div className={`${ROOT_CLASS}__graf2`}></div>
      <div className={`${ROOT_CLASS}__product-block`}>
        <div>
          <Button theme='product-btn' NameBtn="Add product"/>
          <ProfileProduct />
          <ProfileProduct />
          <ProfileProduct />
        </div>
        <div>
          <ProfileProduct />
          <ProfileProduct />
          <ProfileProduct />
        </div>
      </div>
      <div className={`${ROOT_CLASS}__news`}></div>
    </div>
  );
};
