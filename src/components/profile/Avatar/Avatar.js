import * as React from 'react';

const ROOT_CLASS = 'avatar';

const buildRootClass = (props) => {
  return `${ROOT_CLASS} ${props.theme ? ROOT_CLASS + '_' + props.theme : ''}`;
}

export const Avatar = (props) => {
  return (
    <div className={buildRootClass(props)}>
      <img
        src={props.imageSrc}
        className={`${ROOT_CLASS}__picture`}
        alt="avatar"
      />
      { !props.theme ?
        <div
          className={
            `${ROOT_CLASS}__approve ${!props.isIdentityVerification ?
              ROOT_CLASS + '__approve_hidden': ''}`
          }
        >
          <div className={`${ROOT_CLASS}__check`}/>
        </div> :
        null
      }
    </div>
  );
}
