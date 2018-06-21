import * as React from 'react';
import { Page } from '@common/Page';
import { TerminalForm } from '@terminal/TerminalForm';
import { TradeHistory } from '@terminal/TradeHistory';
import { OrderBook } from '@terminal/OrderBook';
import { OrdersTerminal } from '@terminal/OrdersTerminal';

const ROOT_CLASS = 'terminal-page';

export const TerminalPage = (props) => {
  return (
    <Page isLoaded={props.isLoaded}>
      <div className={ROOT_CLASS}>
        <div className={`${ROOT_CLASS}__terminal`}>
          <TradeHistory />
          <OrderBook />
        </div>
        <OrdersTerminal />
        {/*<div className={`${ROOT_CLASS}__graph-wrap`}>
          <div className={`${ROOT_CLASS}__caption`}>PLACE ORDER</div>
          <div className={`${ROOT_CLASS}__radio-button-block`}>
            <RadioButtonGroup
              radios={[
                'Limit',
                'Market'
              ]}
              onClick={props.onChangeRadio}
            />
          </div>
          <div className={`${ROOT_CLASS}__form-block`}>
            <div className={`${ROOT_CLASS}__form`}>
              <TerminalForm
                type='buy'
                nameBtn='PLACE BUY ORDER'
                orderType={props.currentOrder}
                onSubmit={props.placeOrder}
              />
            </div>
            <div className={`${ROOT_CLASS}__form`}>
              <TerminalForm
                type="sell"
                nameBtn='PLACE SELL ORDER'
                orderType={props.currentOrder}
                onSubmit={props.placeOrder}
              />
            </div>
          </div>
        </div>*/}
      </div>
    </Page>
  );
};
