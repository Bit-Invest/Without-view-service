import * as React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import { Line } from 'react-chartjs-2';

const ROOT_CLASS = 'terminal-graph';

export const TerminalGraph = () => (
  <div className={ROOT_CLASS}>
    <Line
      data={{
        datasets: [{
          data: [{x: 10, y: 50}, {x: 20, y: 70}, {x: 30, y: 96}, {x: 40, y: 23}]
        }]
      }}
      options={{
        scales: {
          xAxes: [{
            display: true,
            position: 'bottom'
          }],
          yAxes: [{
            display: true,
            position: 'right',
          }]
        }
      }}
    />
  </div>
);
