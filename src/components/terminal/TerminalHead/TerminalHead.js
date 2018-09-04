import * as React from 'react';
import { Select } from '@registration/select';

const ROOT_CLASS = 'terminal-head';

export const TerminalHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__stock-select`}>
        <Select
          onChange={props.onSelectStock}
          name='select'
          theme='terminal'
          value='Binance'
          defaultOption={
            {
              value: 'Binance',
              label: 'Binance'
            }
          }
          options={[
            {
              value: 'Binance',
              label: 'Binance'
            }
          ]}
        />
      </div>
      <div className={`${ROOT_CLASS}__pair-select`}>
        <Select
          onChange={props.onSelectPair}
          name='select'
          theme='terminal'
          defaultOption={
            {
              value: props.currentPair.symbol,
              label: `${props.currentPair.baseAsset}${' '}
                / ${props.currentPair.quoteAsset}`
            }
          }
          options={props.pairs}
        />
      </div>
      <div className={`${ROOT_CLASS}__type-select`}>
        <Select
          onChange={props.onSelectChartType}
          name='select'
          theme='terminal'
          defaultOption={
            {
              value: 'area',
              label: 'Line'
            }
          }
          options={[
            {
              value: 'area',
              label: 'Line'
            },
            {
              value: 'candle',
              label: 'Candles'
            }
          ]}
        />
      </div>
    </div>
  )
}
