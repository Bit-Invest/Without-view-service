import * as React from 'react';
import { Input } from '@common/Input';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'terminal-form';

export const TerminalForm = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__quantity-wrap`}>
        <div className={`${ROOT_CLASS}__input-title ${ROOT_CLASS}__quantity-title`}>
          { objectLangs[lng]['TerminalForm#1'] }
        </div>
        <Input
          theme="terminal"
          placeholder="0.00"
          tip={props.currentPair.baseAsset}
          name="value"
          onChange={props.handleEnter}
          value={props.value}
        />
      </div>
      <div className={`${ROOT_CLASS}__limit-wrap`}>
        <div className={`${ROOT_CLASS}__input-title ${ROOT_CLASS}__limit-title`}>
          {props.orderType} { objectLangs[lng]['TerminalForm#2'] }
        </div>
        <Input
          theme="terminal"
          placeholder="0.00"
          tip={props.currentPair.quoteAsset}
          disabled={props.orderType === 'Market' ? true : false}
          value={props.orderType === 'Market' ? props.marketValue : props.price}
          name="price"
          onChange={props.handleEnter}
        />
      </div>
      <div
        className={`${ROOT_CLASS}__button ${ROOT_CLASS}__button_${props.type}`}
        onClick={props.handleSubmit}
      >
        { objectLangs[lng]['TerminalForm#3'] } {props.type.toUpperCase()} { objectLangs[lng]['TerminalForm#4'] }
      </div>
    </div>
  );
}
