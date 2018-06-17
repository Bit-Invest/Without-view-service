import * as React from 'react';
import { InputTerminal } from '../input';
import { Button } from '@components/common/Button';
const ROOT_CLASS = 'terminal-form';

export const TerminalForm = (props) => (
  <div className={ROOT_CLASS}>
    <form onSubmit={props.handleSubmit} className={`${ROOT_CLASS}__container-form`}>
      <div className={`${ROOT_CLASS}__input-block`}>
        <div>
          <div className={`${ROOT_CLASS}__label`}>Price</div>
          <div className={`${ROOT_CLASS}__input`}>
            <InputTerminal
              onChange={props.handleEnter}
              name='price'
            />
          </div>
        </div>
        <div>
          <div className={`${ROOT_CLASS}__label`}>Volume</div>
          <div className={`${ROOT_CLASS}__input`}>
            <InputTerminal
              onChange={props.handleEnter}
              name='value'
            />
          </div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__total-input-block`}>
        <div className={`${ROOT_CLASS}__label`}>Total</div>
        <InputTerminal
          onChange={props.handleEnter}
          name='total'
        />
      </div>
      <Button
        theme={`${props.type}-button-terminal-form`}
        NameBtn={props.nameBtn}
      />
    </form>

  </div>
)
