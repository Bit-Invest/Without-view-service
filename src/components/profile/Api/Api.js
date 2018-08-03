import * as React from 'react';

const ROOT_CLASS = 'api';

const status = {
  pending: 'Pending',
  invalid: 'Invalid',
  valid: 'Valid'
}

export const Api = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__head`}>
        <div className={`${ROOT_CLASS}__exchange ${ROOT_CLASS}__exchange_${props.stock}`}></div>
        <div className={`${ROOT_CLASS}__status ${ROOT_CLASS}__status_${props.status}`}>
          {status[props.status]}
        </div>
      </div>
    </div>
  );
}
