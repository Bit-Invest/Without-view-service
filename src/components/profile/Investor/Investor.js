import * as React from 'react';
import { Avatar } from '@profile/Avatar';
import { Rating } from '@marketplace/Rating';
import DefaultIcon from '@assets/images/profile-icon.svg';

const ROOT_CLASS = 'investor';

export const Investor = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__avatar`}>
        <Avatar imageSrc={DefaultIcon} theme="small" />
      </div>
      <div className={`${ROOT_CLASS}__personal-info`}>
        <div className={`${ROOT_CLASS}__name`}>
          {props.surname}{' '}{props.name}
        </div>
        <div className={`${ROOT_CLASS}__role`}>
          {props.role}
        </div>
      </div>
      <div className={`${ROOT_CLASS}__rating`}>
        <Rating
          rating={3}
          votes={83}
          theme="investor"
        />
      </div>
    </div>
  );
}
