import React from 'react';
import { UserInfo } from '@profile/UserInfo';
import { ProfileUnit } from '@profile/ProfileUnit';
import UserIcon from '@assets/images/userIcon.jpg';

const ROOT_CLASS = 'profile-head';

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <UserInfo
        name={props.personalInfo.name}
        surname={props.personalInfo.surname}
        role={props.personalInfo.role}
        status="disabled"
        userImage={UserIcon}
      />
    </div>
  );
};
