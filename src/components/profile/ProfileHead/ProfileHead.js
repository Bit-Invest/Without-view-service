import React from 'react';
import { User } from '@common/User';
import { LogOut } from '@profile/LogOut';

const ROOT_CLASS = 'profile-head';

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__user-wrap`}>
        <User
          name={props.personalInfo.name}
          surname={props.personalInfo.surname}
          role={props.personalInfo.role ? props.personalInfo.role : ''}
        />
        <div className={`${ROOT_CLASS}__log-out`} onClick={props.logOut}>
          <LogOut push={props.push} logOut={props.logOut} />
        </div>
      </div>
    </div>
  );
};
