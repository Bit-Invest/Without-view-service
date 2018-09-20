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
            <div className={`${ROOT_CLASS}__approved ${!props.isIdentityVerification ? `${ROOT_CLASS}__approved-error` : `${ROOT_CLASS}__approved-active` }`}>
              { !props.isIdentityVerification ? '(not approved profile)' : '(approved profile)' }
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
