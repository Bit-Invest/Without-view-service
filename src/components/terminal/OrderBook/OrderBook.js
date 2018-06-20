import * as React from 'react';
import { OrderList } from '@terminal/OrderList';

const ROOT_CLASS = 'order-book';

export const OrderBook = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__caption`}>ORDERBOOK</div>
      <div className={`${ROOT_CLASS}__list-block`}>
        <div className={`${ROOT_CLASS}__name-list`}>Price.EUR</div>
        <div className={`${ROOT_CLASS}__name-list`}>Volume</div>
        <div className={`${ROOT_CLASS}__name-list`}>Total volume</div>
      </div>
      <div className={`${ROOT_CLASS}__list`}>
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
      </div>
      <div className={`${ROOT_CLASS}__price-block`}>
        <div className={`${ROOT_CLASS}__name-price`}>Price.EUR</div>
        <div className={`${ROOT_CLASS}__currency-block`}>
          <div className={`${ROOT_CLASS}__eur-price`}>€ 6493.1{props.eurPrice}</div>
          <div className={`${ROOT_CLASS}__usd-price`}>($ 7974.32){props.usdPrice}</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__list`}>
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
      </div>
    </div>
  )
}
