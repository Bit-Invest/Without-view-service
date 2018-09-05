import * as React from 'react';
import { FillOrdersList } from '@terminal/FillOrdersList';
import { Scrollbars } from 'react-custom-scrollbars';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'fill-orders';

export const FillOrders = props => {
  return (
    <div className={ROOT_CLASS}>
      <Scrollbars style={{width: document.documentElement.clientWidth - 835}}>
        <div className={`${ROOT_CLASS}__list-name`}>
          <div className={`${ROOT_CLASS}__name`}>{ objectLangs[lng]['FillOrders#1'] }</div>
          <div className={`${ROOT_CLASS}__name`}>{ objectLangs[lng]['FillOrders#2'] }</div>
          <div className={`${ROOT_CLASS}__name`}>{ objectLangs[lng]['FillOrders#3'] }</div>
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
