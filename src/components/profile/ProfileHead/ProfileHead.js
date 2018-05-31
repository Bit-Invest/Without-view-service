import React from 'react';
import { UserInfo } from '@profile/UserInfo';
import { ProfileUnit } from '@profile/ProfileUnit';
import UserIcon from '@assets/images/userIcon.jpg';

const ROOT_CLASS = 'profile-head';

// TEST DATA
const units = [
  {
    title: 'Week',
    count: 32
  },
  {
    title: 'Month',
    count: -15
  },
  {
    title: '6 Months',
    count: 247
  },
  {
    title: '1 Year',
    count: 247
  }
];

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <UserInfo
        name={props.personalInfo.name}
        surname={props.personalInfo.surname}
        role={props.personalInfo.role}
        status="active"
        userImage={UserIcon}
      />
      <div className={`${ROOT_CLASS}__units`}>
        {units.map(unit =>
          <ProfileUnit title={unit.title} count={unit.count} />)}
      </div>
    </div>
  );
};
