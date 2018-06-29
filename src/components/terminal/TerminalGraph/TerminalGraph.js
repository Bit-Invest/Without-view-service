import * as React from 'react';
import { Line } from 'react-chartjs-2';

const ROOT_CLASS = 'terminal-graph';

export const TerminalGraph = () => (
  <div className={ROOT_CLASS}>
    <Line
      height={120}
      data={{
        labels: ["12 jun", "13 jun", "14 jun", "15 jun", "16 jun", "17 jun"],
        datasets: [{
          data: [{x: 10, y: 50}, {x: 20, y: 70}, {x: 30, y: 96}, {x: 40, y: 23}, {x: 35, y: 21}, {x: 20, y: 29}],
          backgroundColor: 'rgba(133, 96, 253, 0.4)',
          borderColor: '#8560fd'
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
