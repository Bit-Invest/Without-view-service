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
      <div className={`${ROOT_CLASS}__currencies`}>
        <div className={`${ROOT_CLASS}__base`}>
          <span className={`${ROOT_CLASS}__amount`}>{props.baseAmount}</span>{' '}
          <span className={`${ROOT_CLASS}__currency`}>{props.baseCurrency}</span>
        </div>
        <div className={`${ROOT_CLASS}__second`}>
          <span className={`${ROOT_CLASS}__amount`}>{props.secondAmount}</span>{' '}
          <span className={`${ROOT_CLASS}__currency`}>{props.secondCurrency}</span>
        </div>
      </div>
    </div>
  );
}
