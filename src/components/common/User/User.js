import * as React from 'react';
import { Avatar } from '@profile/Avatar';
// import DefaultIcon from '@assets/images/profile-icon.svg';
import { Rating } from '@marketplace/Rating';
import avatarArr from './importAvatars'

const ROOT_CLASS = 'user';

export const User = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${props.theme ? ROOT_CLASS + '_' + props.theme : ''}`;
  }

  console.log(props)
  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__avatar-wrap`}>
        <Avatar imageSrc={avatarArr[props.imageSrc] ? avatarArr[props.imageSrc] : null} theme={props.theme}/>
      </div>
      <div className={`${ROOT_CLASS}__info`}>
        <div className={`${ROOT_CLASS}__name-wrap`}>
          {props.name} {props.surname}
        </div>
        <div className={`${ROOT_CLASS}__rating`}>
          <Rating
            rating={3}
            votes={83}
            theme={props.theme === 'small' ? 'marketplace' : 'profile'}
            role={props.role}
          />
        </div>
      </div>
    </div>
  );
};
