import * as React from 'react';
import { OrderTimer } from '@terminal/OrderTimer';
import { Utils } from '@common/Utils';

const ROOT_CLASS = 'open-order-list';

export const OpenOrderList = props => {
  const time = Utils.convertDateForOrders(props.time);
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__price-list`}>{props.price}</div>
      <div className={`${ROOT_CLASS}__data-list ${ROOT_CLASS}__data-list_origin`}>{props.origin}</div>
      <div className={`${ROOT_CLASS}__data-list ${ROOT_CLASS}__data-list_2nd-volume`}>{props.remain}</div>
      <div className={`${ROOT_CLASS}__data-list`}>{props.total}</div>
    </div>
  )
}
