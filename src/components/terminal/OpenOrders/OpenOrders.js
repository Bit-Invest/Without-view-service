import * as React from 'react';
import { OpenOrderList } from '@terminal/OpenOrderList';

const ROOT_CLASS = 'open-orders';

export const OpenOrders = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__list-name`}>
        <div className={`${ROOT_CLASS}__name`}>Order date</div>
        <div className={`${ROOT_CLASS}__name`}>Price BTC</div>
        <div className={`${ROOT_CLASS}__name`}>Origin</div>
        <div className={`${ROOT_CLASS}__name`}>Remain</div>
        <div className={`${ROOT_CLASS}__name`}>Total</div>
      </div>
      <div className={`${ROOT_CLASS}__hr`}></div>
      <OpenOrderList />
      <OpenOrderList />
      <OpenOrderList />
      <OpenOrderList />
      <OpenOrderList />
    </div>
  )
}
