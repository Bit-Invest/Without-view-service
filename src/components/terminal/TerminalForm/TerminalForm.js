import * as React from 'react';
import { InputTerminal } from '../input';
import { Button } from '@components/common/Button';

const ROOT_CLASS = 'terminal-form';

export const TerminalForm = (props) => (
  <div className={ROOT_CLASS}>
    <div className={`${ROOT_CLASS}__quantity-wrap`}>
      <div className={`${ROOT_CLASS}__input-title ${ROOT_CLASS}__quantity-title`}>
        
      </div>
    </div>
    <div className={`${ROOT_CLASS}__limit-wrap`}>

    </div>
    <div className={`${ROOT_CLASS}__fees-info`}>

    </div>
    <Button NameBtn={`PLACE ${props.type.toUpperCase()} ORDER`} />
  </div>

)
