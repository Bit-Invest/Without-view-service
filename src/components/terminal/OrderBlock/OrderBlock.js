import * as React from 'react';

const ROOT_CLASS = 'order-block';

export const OrderBlock = (props) => (
  <div className={ROOT_CLASS}>
    <div className={`${ROOT_CLASS}__order-types`}>
      <div className={`${ROOT_CLASS}__order-type`} name="buy">
        BUY
      </div>
      <div className={`${ROOT_CLASS}__order-type`} name="sell">
        SELL
      </div>
    </div>
    <div className={`${ROOT_CLASS}__form-wrap`}>

    </div>
  </div>
);
