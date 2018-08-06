import * as React from 'react';
import { FillOrdersList } from '@terminal/FillOrdersList';
import { Scrollbars } from 'react-custom-scrollbars';

const ROOT_CLASS = 'fill-orders';

export const FillOrders = props => {
  return (
    <div className={ROOT_CLASS}>
      <Scrollbars style={{width: document.documentElement.clientWidth - 835}}>
        <div className={`${ROOT_CLASS}__list-name`}>
          <div className={`${ROOT_CLASS}__name`}>ORDER DATE</div>
          <div className={`${ROOT_CLASS}__name`}>PRICE</div>
          <div className={`${ROOT_CLASS}__name`}>QUANTITY</div>
        </div>
        <div className={`${ROOT_CLASS}__hr`}></div>
        <div className={`${ROOT_CLASS}__list`}>
          {props.orders.map((order, index) => {
            return (
              <FillOrdersList
                time={order.time}
                price={order.price}
                qty={order.qty}
                isBuyer={order.isBuyer}
                key={index}
              />
            );
          })}
        </div>
      </Scrollbars>
    </div>
  )
}
