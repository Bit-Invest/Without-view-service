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
        <div className={`${ROOT_CLASS}__name-list ${ROOT_CLASS}__name-list_total`}>Total volume</div>
      </div>
      <div className={`${ROOT_CLASS}__list ${ROOT_CLASS}__list_asks`}>
        {props.asks.map((ask, index) => {
          return (
            <OrderList
              price={ask.price}
              volume={ask.quantity}
              type="ask"
              key={ask.price}
            />
          );
        })}
      </div>
      <div className={`${ROOT_CLASS}__price-block`}>
        <div className={`${ROOT_CLASS}__name-price`}>Price.EUR</div>
        <div className={`${ROOT_CLASS}__currency-block`}>
          <div className={`${ROOT_CLASS}__eur-price`}>€ 6493.1{props.eurPrice}</div>
          <div className={`${ROOT_CLASS}__usd-price`}>($ 7974.32){props.usdPrice}</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__list ${ROOT_CLASS}__list_bids`}>
        {props.bids.map((bid, index) => {
          return (
            <OrderList
              price={bid.price}
              volume={bid.quantity}
              type="bid"
              key={bid.price}
            />
          );
        })}
      </div>
    </div>
  )
}
