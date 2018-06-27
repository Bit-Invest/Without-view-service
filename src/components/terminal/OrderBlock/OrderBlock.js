import * as React from 'react';
import { TerminalForm } from '@terminal/TerminalForm';

const ROOT_CLASS = 'order-block';

const orderTypes = ['buy', 'sell'];

export const OrderBlock = (props) => (
  <div className={ROOT_CLASS}>
    <div className={`${ROOT_CLASS}__order-types`}>
      {orderTypes.map((type, index) =>
        <div
          className={
            `${ROOT_CLASS}__order-type
            ${ROOT_CLASS}__order-type_${type}
            ${props.activeType === type ?
              ROOT_CLASS + '__order-type_active' :
              ''
            }`
          }
          onClick={(event) => {
            let name = type;
            props.onClickType(name);
          }}
        >
          {type.toUpperCase()}
        </div>
      )}
    </div>
    <div className={`${ROOT_CLASS}__form-wrap`}>
      <TerminalForm type={props.activeType}/>
    </div>
  </div>
);
