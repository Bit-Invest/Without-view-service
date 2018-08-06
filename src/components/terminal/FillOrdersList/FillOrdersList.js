import * as React from 'react';
import { Utils } from '@common/Utils';

const ROOT_CLASS = 'fill-orders-list';

export const FillOrdersList = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__data-list`}>{Utils.convertDateForTerminal(props.time)}</div>
      <div
        className={
          `${ROOT_CLASS}__price-list ${ROOT_CLASS}__price-list_${props.isBuyer ? 'green' : 'red'}`
        }
      >
        {props.price}
      </div>
      <div className={`${ROOT_CLASS}__data-list`}>{props.qty}</div>
    </div>
  )
}
