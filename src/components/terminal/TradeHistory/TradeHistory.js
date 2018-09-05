import * as React from 'react';
import { HistoryList } from '@terminal/HistoryList';
import { Utils } from '@common/Utils';
import { Select } from '@registration/select';
import { Scrollbars } from 'react-custom-scrollbars';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'trader-history';

export const TradeHistory = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__caption`}>
        <Select
          name="select"
          theme="terminal"
          defaultOption={{
            value: 'trade-history',
            label: objectLangs[lng]['TradeHistory#4']
          }}
          options={[
            {
              value: 'trade-history',
              label: objectLangs[lng]['TradeHistory#4']
            }
          ]}
        />
      </div>
      <div className={`${ROOT_CLASS}__list-wrap`}>
        <div className={`${ROOT_CLASS}__list-block`}>
          <div className={`${ROOT_CLASS}__name-list`}>{ objectLangs[lng]['TradeHistory#1'] }</div>
          <div className={`${ROOT_CLASS}__name-list`}>{ objectLangs[lng]['TradeHistory#2'] }</div>
          <div className={`${ROOT_CLASS}__name-list ${ROOT_CLASS}__name-list_time`}>{ objectLangs[lng]['TradeHistory#3'] }</div>
        </div>
        <div className={`${ROOT_CLASS}__list`}>
          <Scrollbars style={{width: 310}} autoHide>
            {props.history.map((trade, index) => {
              return (
                <HistoryList
                  price={trade.price}
                  qty={trade.quantity}
                  time={Utils.convertDateForTerminal(trade.time)}
                  isUp={trade.maker}
                  key={index}
                />
              )
            })}
          </Scrollbars>
        </div>
      </div>
    </div>
  )
}
