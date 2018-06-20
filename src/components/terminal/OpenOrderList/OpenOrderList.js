import * as React from 'react';

const ROOT_CLASS = 'open-order-list';

export const OpenOrderList = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__data-list`}>4d 3h 6m 18s</div>
      <div className={`${ROOT_CLASS}__price-list`}>0.00019210</div>
      <div className={`${ROOT_CLASS}__data-list`}>65.839673334</div>
      <div className={`${ROOT_CLASS}__data-list`}>65.839673334</div>
      <div className={`${ROOT_CLASS}__data-list`}>0.01264780</div>
      <div className={`${ROOT_CLASS}__status-list`}>close</div>
    </div>
  )
}
