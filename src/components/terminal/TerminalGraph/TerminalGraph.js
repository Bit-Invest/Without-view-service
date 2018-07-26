import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { Utils } from '@common/Utils';
import { StockCandleChart } from '@common/StockCandleChart';

const ROOT_CLASS = 'terminal-graph';

export const TerminalGraph = (props) => {
  const now = Date.now();
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__graph-wrap`}>
        <StockCandleChart
          width={643}
          height={391}
          type="svg"
          data={[
            {
              high: 25.835021381744056,
              low: 25.411360259406774,
              open: 25.436282332605284,
              date: now - 60000 * 60 * 24,
              close: 25.710416
            },
            {
              high: 28.835021381744056,
              low: 28.411360259406774,
              open: 28.436282332605284,
              date: now - 60000 * 60 * 48,
              close: 28.710416
            },
            {
              high: 31.835021381744056,
              low: 31.411360259406774,
              open: 31.436282332605284,
              date: now - 60000 * 60 * 72,
              close: 31.710416
            },
            {
              high: 33.835021381744056,
              low: 33.411360259406774,
              open: 33.436282332605284,
              date: now - 60000 * 60 * 96,
              close: 33.710416
            },
            {
              high: 29.835021381744056,
              low: 29.411360259406774,
              open: 29.436282332605284,
              date: now - 60000 * 60 * 120,
              close: 29.710416
            },
            {
              high: 23.835021381744056,
              low: 23.411360259406774,
              open: 23.436282332605284,
              date: now - 60000 * 60 * 144,
              close: 23.710416
            }
          ].reverse()}
        />
      </div>
    </div>
  );
};

// const createTestData = () => {
//   let result = [];
//   for (let i = 0; i < 1000; i++) {
//     result.push({
//       high: 25.835021381744056,
//       low: 25.411360259406774,
//       date: now - i * 600000000,
//       open: 25.436282332605284,
//       close: 25.710416
//     });
//   }
//   return result.reverse();
// }
// <ChartCanvas>
//   <Chart />
// </ChartCanvas>

// <Line
//   height={500}
//   width={5000}
//   data={{
//     labels: props.chart.lables.map(label => Utils.convertTimeForLabel(label)),
//     datasets: [{
//       data: props.chart.values.map((value, index) => {
//         return {
//           x: props.chart.lables[index],
//           y: value
//         };
//       }),
//       backgroundColor: 'rgba(133, 96, 253, 0.4)',
//       borderColor: '#8560fd',
//       pointRadius: 0,
//       borderWidth: 1
//     }]
//   }}
//   options={{
//     scales: {
//       xAxes: [{
//         display: true,
//         position: 'bottom'
//       }],
//       yAxes: [{
//         display: true,
//         position: 'right',
//       }]
//     }
//   }}
// />
