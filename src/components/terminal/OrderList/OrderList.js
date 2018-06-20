import * as React from 'react';

const ROOT_CLASS = 'order-list';

export const OrderList = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__price-currency`}>6528.5{props.tradeSize}</div>
      <div className={`${ROOT_CLASS}__volume`}>0.265898{props.price}</div>
      <div className={`${ROOT_CLASS}__total-volume`}>1.835{props.time}</div>
    </div>
  )
}
