import * as React from 'react';
import { Avatar } from '@profile/Avatar';

const ROOT_CLASS = 'user-info';

export const UserInfo = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <Avatar imageSrc={props.userImage} />
      <div className={`${ROOT_CLASS}__info`}>
        <div className={`${ROOT_CLASS}__name`}>
          {props.name}&nbsp;{props.surname}
        </div>
        <div className={`${ROOT_CLASS}__kyc-status
            ${ROOT_CLASS}__kyc-status_${props.status}`}>
          <div className={`${ROOT_CLASS}__kyc-icon`}></div>
          <div className={`${ROOT_CLASS}__kyc-text`}>
            {/*{`${props.role.toUpperCase()} APPROVED`}*/}
          </div>
        </div>
      </div>
    </div>
  );
}
