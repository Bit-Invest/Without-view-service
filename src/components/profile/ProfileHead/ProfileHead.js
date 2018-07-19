import React from 'react';
import { UserInfo } from '@profile/UserInfo';
import { User } from '@common/User';
import { LogOut } from '@profile/LogOut';
import { Unit } from '@common/Unit';

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
      <div className={`${ROOT_CLASS}__units`}>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit size="profile" title="week" count={32}/>
        </div>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit size="profile" title="month" count={-15}/>
        </div>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit size="profile" title="6 month" count={-15}/>
        </div>
        <div className={`${ROOT_CLASS}__unit`}>
          <Unit size="profile" title="1 year" count={20}/>
        </div>
      </div>
    </div>
  );
};
// <UserInfo
//   name={props.personalInfo.name}
//   surname={props.personalInfo.surname}
//   role={props.personalInfo.role ? props.personalInfo.role : ''}
//   status="disabled"
//   push={props.push}
//   logOut={props.logOut}
// />
