import * as React from 'react';
import { OpenOrderList } from '@terminal/OpenOrderList';
import { Scrollbars } from 'react-custom-scrollbars';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'open-orders';

export const OpenOrders = props => {
  return (
    <div className={ROOT_CLASS}>
      <Scrollbars style={{width: document.documentElement.clientWidth - 835}}>
        <div className={`${ROOT_CLASS}__list-name`}>
          <div className={`${ROOT_CLASS}__name`}>{ objectLangs[lng]['OpenOrders#1'] }</div>
          <div className={`${ROOT_CLASS}__name`}>{ objectLangs[lng]['OpenOrders#2'] }</div>
          <div className={`${ROOT_CLASS}__name`}>{ objectLangs[lng]['OpenOrders#3'] }</div>
          <div className={`${ROOT_CLASS}__name`}>{ objectLangs[lng]['OpenOrders#4'] }</div>
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
              symbol={order.symbol}
              id={order.orderId}
              key={index}
            />
          )}
        </div>
      </Scrollbars>
    </div>
  )
}
