import React from 'react';
import './UserName.css';

const ROOT_CLASS = 'user-name';

export const UserName = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__name`}>Ivan</div>
      <div className={`${ROOT_CLASS}__name`}>Ivanov</div>
    </div>
  );
};
