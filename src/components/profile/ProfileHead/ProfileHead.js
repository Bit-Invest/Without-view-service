import React from 'react';
import { UserInfo } from '@profile/UserInfo';
import UserIcon from '@assets/images/userIcon.jpg';

const ROOT_CLASS = 'profile-head';

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <UserInfo
        name='test'
        surname='test'
        userImage={UserIcon}
      />
    </div>
  );
};
