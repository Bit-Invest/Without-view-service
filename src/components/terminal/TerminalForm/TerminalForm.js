import * as React from 'react';
import { Input } from '@common/Input';

const ROOT_CLASS = 'terminal-form';

export const TerminalForm = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__quantity-wrap`}>
        <div className={`${ROOT_CLASS}__input-title ${ROOT_CLASS}__quantity-title`}>
          Quantity
        </div>
        <Input
          theme="terminal"
          placeholder="0.00"
          tip={props.currentPair.baseAsset}
        />
      </div>
      <div className={`${ROOT_CLASS}__limit-wrap`}>
        <div className={`${ROOT_CLASS}__input-title ${ROOT_CLASS}__limit-title`}>
          {props.orderType} Price
        </div>
        <Input
          theme="terminal"
          placeholder="0.00"
          tip={props.currentPair.quoteAsset}
          disabled={props.orderType === 'Market' ? true : false}
          value={props.orderType === 'Market' ? props.marketValue : ''}
        />
      </div>
      <div
        className={`${ROOT_CLASS}__button ${ROOT_CLASS}__button_${props.type}`}
        onClick={props.onClickButton}
      >
        PLACE {props.type.toUpperCase()} ORDER
      </div>
    </div>
  );
}
