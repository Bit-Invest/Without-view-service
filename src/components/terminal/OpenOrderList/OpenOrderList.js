import * as React from 'react';
import { OrderTimer } from '@terminal/OrderTimer';

const ROOT_CLASS = 'open-order-list';

export const OpenOrderList = props => {
  return (
    <div className={ROOT_CLASS}>
      <OrderTimer time={props.time} />
      <div className={`${ROOT_CLASS}__price-list`}>{props.price}</div>
      <div className={`${ROOT_CLASS}__data-list`}>{props.origin}</div>
      <div className={`${ROOT_CLASS}__data-list`}>{props.remain}</div>
      <div className={`${ROOT_CLASS}__data-list`}>{props.total}</div>
    </div>
  )
}
