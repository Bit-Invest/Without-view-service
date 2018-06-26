import * as React from 'react';
import { Button } from '@components/common/Button';
import { Input } from '@common/Input';

const ROOT_CLASS = 'terminal-form';

export const TerminalForm = (props) => (
  <div className={ROOT_CLASS}>
    <div className={`${ROOT_CLASS}__quantity-wrap`}>
      <div className={`${ROOT_CLASS}__input-title ${ROOT_CLASS}__quantity-title`}>
        Quantity
      </div>
      <Input
        theme="terminal"
        placeholder="0.00"
        tip="BTC"
      />
    </div>
    <div className={`${ROOT_CLASS}__limit-wrap`}>
      <div className={`${ROOT_CLASS}__input-title ${ROOT_CLASS}__limit-title`}>
        Limit Price
      </div>
      <Input
        theme="terminal"
        placeholder="0.00"
        tip="ETH"
      />
    </div>
    <div
      className={`${ROOT_CLASS}__button ${ROOT_CLASS}__button_${props.type}`}
      onClick={props.onClickButton}
    >
      PLACE {props.type.toUpperCase()} ORDER
    </div>
  </div>

)
