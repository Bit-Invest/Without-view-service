import * as React from 'react';

const ROOT_CLASS = 'balance';

export const Balance = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__base`}>
        {props.base}{' '}
        <span className={`${ROOT_CLASS}__currency`}>
          {props.baseCurrency}
        </span>
      </div>
      <div className={`${ROOT_CLASS}__second`}>
        {props.second}{' '}
        <span className={`${ROOT_CLASS}__currency`}>
          {props.secondCurrency}
        </span>
      </div>
    </div>
  );
}
