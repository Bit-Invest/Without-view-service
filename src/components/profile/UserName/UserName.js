import React from 'react';

const ROOT_CLASS = 'user-name';

export const UserName = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__name`}>{props.name}</div>
      <div className={`${ROOT_CLASS}__name`}>{props.surname}</div>
    </div>
  );
};
