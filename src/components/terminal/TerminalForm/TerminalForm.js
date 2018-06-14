import * as React from 'react';
import { InputTerminal } from '../input';
const ROOT_CLASS = 'terminal-form';

export const TerminalForm = () => (
  <div className={ROOT_CLASS}>
    <div className={`${ROOT_CLASS}__caption`}>PLACE ORDER</div>

    <div className={`${ROOT_CLASS}__radio-button-block`}>
      <div className={`${ROOT_CLASS}__radio-button`}>
        <input className={`${ROOT_CLASS}__radio`} type="radio" />
        <div>Limit</div>
      </div>
      <div className={`${ROOT_CLASS}__radio-button`}>
        <input className={`${ROOT_CLASS}__radio`} type="radio" />
        <div>Market</div>
      </div>
    </div>

    <div className={`${ROOT_CLASS}__container-form`}>
      <div>
        <div className={`${ROOT_CLASS}__input-block`}>
          <div>
            <div className={`${ROOT_CLASS}__label`}>Price</div>
            <div className={`${ROOT_CLASS}__input`}>
              <InputTerminal />
            </div>
          </div>
          <div>
            <div className={`${ROOT_CLASS}__label`}>Volume</div>
            <div className={`${ROOT_CLASS}__input`}>
              <InputTerminal />
            </div>
          </div>
        </div>
        <div className={`${ROOT_CLASS}__total-input-block`}>
          <div className={`${ROOT_CLASS}__label`}>Total</div>
          <InputTerminal />
        </div>
        <button className={`${ROOT_CLASS}__button-buy`}>PLACE BUY ORDER</button>
      </div>
      <div>
        <div className={`${ROOT_CLASS}__input-block`}>
          <div>
            <div className={`${ROOT_CLASS}__label`}>Price</div>
            <div className={`${ROOT_CLASS}__input`}>
              <InputTerminal />
            </div>
          </div>
          <div>
            <div className={`${ROOT_CLASS}__label`}>Volume</div>
            <div className={`${ROOT_CLASS}__input`}>
              <InputTerminal />
            </div>
          </div>
        </div>
        <div className={`${ROOT_CLASS}__total-input-block`}>
          <div className={`${ROOT_CLASS}__label`}>Total</div>
          <InputTerminal />
        </div>
        <button className={`${ROOT_CLASS}__button-sell`}>PLACE SELL ORDER</button>
      </div>
    </div>

  </div>
)
