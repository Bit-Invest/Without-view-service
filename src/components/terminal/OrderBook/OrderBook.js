import * as React from 'react';
import { OrderList } from '@terminal/OrderList';
import { Select } from '@registration/select';
import { Scrollbars } from 'react-custom-scrollbars';

const ROOT_CLASS = 'order-book';

const formatTotal = (total) => {
  const totalArr = total.split('.');
  const result = totalArr.length > 1 ?
    `${totalArr[0]}.${totalArr[1].substring(0, 3)}${totalArr[1].length < 3 ?
      fillZeros(3 - totalArr[1].length) : ''}` : totalArr[0];
  return result;
}

const fillZeros = (num) => {
  let result = '';
  for (let i = 0; i < num; i++) {
    result += '0';
  }
  return result;
}

export const OrderBook = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__caption`}>
        <Select
          theme="terminal"
          defaultOption={{
            value: 'order-book',
            label: 'ORDER BOOK'
          }}
          options={[
            {
              value: 'order-book',
              label: 'ORDER BOOK'
            }
          ]}
        />
      </div>
      <div className={`${ROOT_CLASS}__block ${ROOT_CLASS}__block_bids`}>
        <div className={`${ROOT_CLASS}__header ${ROOT_CLASS}__header_bids`}>
          <div className={`${ROOT_CLASS}__header-title ${ROOT_CLASS}__header-title_price`}>
            PRICE EUR
          </div>
          <div className={`${ROOT_CLASS}__header-title`}>
            VOLUME
          </div>
          <div className={`${ROOT_CLASS}__header-title`}>
            TOTAL
          </div>
        </div>
        <div className={`${ROOT_CLASS}__list ${ROOT_CLASS}__list_bids`}>
          <Scrollbars style={{width: 290}} autoHide >
            {props.bids.map((bid, index) => {
              return (
                <OrderList
                  price={bid.price}
                  volume={bid.quantity}
                  total={formatTotal(bid.total)}
                  type="bid"
                  key={bid.price}
                />
              );
            })}
          </Scrollbars>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__block ${ROOT_CLASS}__block_asks`}>
        <div className={`${ROOT_CLASS}__header ${ROOT_CLASS}__header_asks`}>
          <div className={`${ROOT_CLASS}__header-title ${ROOT_CLASS}__header-title_price`}>
            PRICE EUR
          </div>
          <div className={`${ROOT_CLASS}__header-title`}>
            VOLUME
          </div>
          <div className={`${ROOT_CLASS}__header-title`}>
            TOTAL
          </div>
        </div>
        <div className={`${ROOT_CLASS}__list ${ROOT_CLASS}__list_asks`}>
          <Scrollbars style={{width: 290}} autoHide >
            {props.asks.map((ask, index) => {
              return (
                <OrderList
                  price={ask.price}
                  volume={ask.quantity}
                  total={formatTotal(ask.total)}
                  type="ask"
                  key={ask.price}
                />
              );
            })}
          </Scrollbars>
        </div>
      </div>
    </div>
  )
}
