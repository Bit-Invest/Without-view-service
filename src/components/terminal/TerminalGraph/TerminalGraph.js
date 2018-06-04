import * as React from 'react';
import TradingViewWidget from 'react-tradingview-widget';

const ROOT_CLASS = 'terminal-graph';

export const TerminalGraph = () => (
  <div className={ROOT_CLASS}>
    <TradingViewWidget
      symbol={"BINANCE:ETHBTC"}
    />
  </div>
);
