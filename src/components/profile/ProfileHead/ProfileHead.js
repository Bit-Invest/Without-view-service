import React from 'react';
import { IconUser } from '@profile/IconUser';
import { UserName } from '@profile/UserName';
import { Button } from '@registration/Forms/Button/button';
import { ProfileProduct } from '@profile/ProfileProduct';
import { Rating } from '@marketplace/Rating/Rating';

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
          <ProfileProduct name="XML" today={19} rate={213} />
          <ProfileProduct name="MDK" today={5} rate={103} />
          <ProfileProduct name="LKC" today={3} rate={157} />
        </div>
        <div>
          <ProfileProduct name="JRK" today={-3} rate={-70} />
          <ProfileProduct name="UKO" today={28} rate={-10} />
          <ProfileProduct name="OOL" today={14} rate={10} />
        </div>
      </div>
      <div className={`${ROOT_CLASS}__news`}></div>
    </div>
  );
};
