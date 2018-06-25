import * as React from 'react';
import { Select } from '@registration/select';

const ROOT_CLASS = 'terminal-head';

export const TerminalHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <Select
        onChange={props.handleEnter}
        name='select'
        theme='terminal'
        value='Binnance'
        defaultOption={
          {
            value: 'Binnance',
            label: 'Binnance'
          }
        }
        options={[
          {
            value: 'Binnance',
            label: 'Binnance'
          },
          {
            value: 'investor',
            label: 'Investor'
          }
        ]}
      />
      <Select
        onChange={props.handleEnter}
        name='select'
        theme='terminal'
        defaultOption={
          {
            value: 'BTC / ETH',
            label: 'BTC / ETH'
          }
        }
        options={[
          {
            value: 'BTC / ETH',
            label: 'BTC / ETH'
          },
          {
            value: 'investor',
            label: 'Investor'
          }
        ]}
      />
      <Select
        onChange={props.handleEnter}
        name='select'
        theme='terminal'
        defaultOption={
          {
            value: 'Line',
            label: 'investor'
          }
        }
        options={[
          {
            value: 'Line',
            label: 'Line'
          },
          {
            value: 'investor',
            label: 'Investor'
          }
        ]}
      />
    </div>
  )
}
