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
          isIdentityVerification={props.personalInfo.isIdentityVerification}
        />
        <div className={`${ROOT_CLASS}__log-out`} onClick={props.logOut}>
          <LogOut push={props.push} logOut={props.logOut} />
        </div>
      </div>
      <button id="signupButton" onClick={props.signupClick} className="civic-button-a medium" type="button">
        <svg className="svg-icon svg-civic-icon" viewBox="0 0 160 160" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img">
            <path d="M88.229375,86.2274355 C94.4595702,83.1794975 98.75,76.778485 98.75,69.3750625 C98.75,59.0194375 90.355625,50.6250625 80,50.6250625 C69.644375,50.6250625 61.25,59.0194375 61.25,69.3750625 C61.25,76.7787325 65.5407168,83.1799256 71.77125,86.2277412 L71.77125,109.375 L88.229375,109.375 L88.229375,86.2274355 Z M80,140 C46.915625,140 20,113.084375 20,80 C20,46.915625 46.915625,20 80,20 C106.99875,20 129.88625,37.92625 137.394375,62.5 L158.075,62.5 C150.093125,26.735 118.170625,0 80,0 C35.816875,0 0,35.8175 0,80 C0,124.1825 35.816875,160 80,160 C118.170625,160 150.093125,133.265 158.075,97.5 L137.394375,97.5 C129.88625,122.07375 106.99875,140 80,140 Z"></path>
        </svg>
        <span>Verify with Civic</span>
      </button>
    </div>
  );
};
