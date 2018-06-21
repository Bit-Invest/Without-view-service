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
        options={[
          {
            value: 'trader',
            label: 'Trader'
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
