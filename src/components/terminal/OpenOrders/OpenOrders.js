import * as React from 'react';
import { OpenOrderList } from '@terminal/OpenOrderList';

const ROOT_CLASS = 'open-orders';

export const OpenOrders = props => {
  console.log(props.orders);
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__list-name`}>
        <div className={`${ROOT_CLASS}__name`}>PRICE, EUR</div>
        <div className={`${ROOT_CLASS}__name`}>VOLUME</div>
        <div className={`${ROOT_CLASS}__name`}>VOLUME</div>
        <div className={`${ROOT_CLASS}__name`}>TOTAL</div>
      </div>
      <div className={`${ROOT_CLASS}__hr`}></div>
      <div className={`${ROOT_CLASS}__orders`}>
        {props.orders.map((order, index) =>
          <OpenOrderList
            time={order.time}
            price={order.price}
            origin={order.origQty}
            remain={order.executedQty}
            total={order.price * order.origQty}
            key={index}
          />
        )}
      </div>
    </div>
  )
}
