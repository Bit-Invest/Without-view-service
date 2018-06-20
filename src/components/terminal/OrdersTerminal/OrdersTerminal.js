import * as React from 'react';
import { OpenOrders } from '@terminal/OpenOrders';

const ROOT_CLASS = 'orders-limit';

export const OrdersTerminal = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__btn-block`}>
        <div className={`${ROOT_CLASS}__btn`}>Open Orders</div>
        <div onClick={props.toggleState} className={`${ROOT_CLASS}__btn`}>Fill Orders</div>
        <div className={`${ROOT_CLASS}__btn`}>Depth of Market</div>
      </div>
      <OpenOrders />
    </div>
  )
}
