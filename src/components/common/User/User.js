import * as React from 'react';
import { Avatar } from '@profile/Avatar';
import DefaultIcon from '@assets/images/profile-icon.svg';
import { Rating } from '@marketplace/Rating';
import avatarArr from './importAvatars'

const ROOT_CLASS = 'user';

export const User = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${props.theme ? ROOT_CLASS + '_' + props.theme : ''}`;
  }

  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__avatar-wrap`}>
        <Avatar imageSrc={avatarArr[props.imageSrc] ? avatarArr[props.imageSrc] : DefaultIcon} theme={props.theme}/>
      </div>
      <div className={`${ROOT_CLASS}__info`}>
        <div className={`${ROOT_CLASS}__name-wrap`}>
          {props.name} {props.surname}
          { !props.theme ? 
            <div className={`${ROOT_CLASS}__approved`}>
              { !props.isIdentityVerification ?
                <button id="signupButton" onClick={props.signupClick} className="civic-button-a medium" type="button">
                  <svg className="svg-icon svg-civic-icon" viewBox="0 0 160 160" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img">
                      <path d="M88.229375,86.2274355 C94.4595702,83.1794975 98.75,76.778485 98.75,69.3750625 C98.75,59.0194375 90.355625,50.6250625 80,50.6250625 C69.644375,50.6250625 61.25,59.0194375 61.25,69.3750625 C61.25,76.7787325 65.5407168,83.1799256 71.77125,86.2277412 L71.77125,109.375 L88.229375,109.375 L88.229375,86.2274355 Z M80,140 C46.915625,140 20,113.084375 20,80 C20,46.915625 46.915625,20 80,20 C106.99875,20 129.88625,37.92625 137.394375,62.5 L158.075,62.5 C150.093125,26.735 118.170625,0 80,0 C35.816875,0 0,35.8175 0,80 C0,124.1825 35.816875,160 80,160 C118.170625,160 150.093125,133.265 158.075,97.5 L137.394375,97.5 C129.88625,122.07375 106.99875,140 80,140 Z"></path>
                  </svg>
                  <span>Pass KYC with Civic</span>
                </button> :
                <button id="signupButton" className="civic-button-approved medium" type="button">
                  <svg className="svg-icon svg-civic-icon" viewBox="0 0 160 160" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img">
                      <path d="M88.229375,86.2274355 C94.4595702,83.1794975 98.75,76.778485 98.75,69.3750625 C98.75,59.0194375 90.355625,50.6250625 80,50.6250625 C69.644375,50.6250625 61.25,59.0194375 61.25,69.3750625 C61.25,76.7787325 65.5407168,83.1799256 71.77125,86.2277412 L71.77125,109.375 L88.229375,109.375 L88.229375,86.2274355 Z M80,140 C46.915625,140 20,113.084375 20,80 C20,46.915625 46.915625,20 80,20 C106.99875,20 129.88625,37.92625 137.394375,62.5 L158.075,62.5 C150.093125,26.735 118.170625,0 80,0 C35.816875,0 0,35.8175 0,80 C0,124.1825 35.816875,160 80,160 C118.170625,160 150.093125,133.265 158.075,97.5 L137.394375,97.5 C129.88625,122.07375 106.99875,140 80,140 Z"></path>
                  </svg>
                  <span>Approved with Civic</span>
                </button>
              }
            </div> : 
            null
          }
        </div>
        <div className={`${ROOT_CLASS}__rating`}>
          <Rating
            rating={props.raiting}
            votes={props.comment !== undefined ? props.comment : 0}
            theme={props.theme === 'small' ? 'marketplace' : 'profile'}
            role={props.role}
          />
        </div>
      </div>
    </div>
  );
};
