import * as React from 'react';

const ROOT_CLASS = 'api';

export const Api = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__head`}>
        <div className={`${ROOT_CLASS}__exchange`}></div>
        <div className={`${ROOT_CLASS}__status`}></div>
      </div>
      <div className={`${ROOT_CLASS}__currencies`}>
        <div className={`${ROOT_CLASS}__base`}>

        </div>
        <div className={`${ROOT_CLASS}__second`}>

        </div>
      </div>
    </div>
  );
}
