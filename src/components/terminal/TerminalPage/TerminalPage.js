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
        <div className={`${ROOT_CLASS}__1st-column`}>
          <TradeHistory />
        </div>
        <div className={`${ROOT_CLASS}__2nd-column`}>
          <OrdersTerminal />
        </div>
        <div className={`${ROOT_CLASS}__3rd-column`}>
          <OrderBook />
        </div>
      </div>
    </Page>
  );
};
