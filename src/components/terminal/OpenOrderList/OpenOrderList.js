import * as React from 'react';

const ROOT_CLASS = 'open-order-list';

export const OpenOrderList = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__price-list`}>{props.price}</div>
      <div className={`${ROOT_CLASS}__data-list ${ROOT_CLASS}__data-list_origin`}>{props.origin}</div>
      <div className={`${ROOT_CLASS}__data-list ${ROOT_CLASS}__data-list_2nd-volume`}>{props.remain}</div>
      <div className={`${ROOT_CLASS}__data-list`}>{props.total}</div>
      <div className={`${ROOT_CLASS}__close`} onClick={props.onClickClose}>Close</div>
    </div>
  )
}
