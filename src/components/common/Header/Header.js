import * as React from 'react';

const ROOT_CLASS = 'header';

export const Header = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__currencies`}>

      </div>
      <div className={`${ROOT_CLASS}__users-number`}>

      </div>
    </div>
  );
}
