import * as React from 'react';

const ROOT_CLASS = 'history-list';

export const HistoryList = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__trade-size`}>0.11924204{props.tradeSize}</div>
      <div className={`${ROOT_CLASS}__price`}>6430.00{props.price}</div>
      <div className={`${ROOT_CLASS}__time`}>16.22.45{props.time}</div>
    </div>
  )
}
