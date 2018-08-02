import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { Utils } from '@common/Utils';
import { StockCandleChart } from '@common/StockCandleChart';
import { StockAreaChart } from '@common/StockAreaChart';

const ROOT_CLASS = 'terminal-graph';

const mapCandle = (point) => {
  const { open, close, high, low } = point;

  return {
    open: +open,
    close: +close,
    high: +high,
    low: +low,
    date: new Date(point.eventTime).getTime()
  };
}

const mapArea = (point) => {
  const { close, eventTime } = point;

  return {
    date: new Date(eventTime).getTime(),
    close: +close
  };
}

const chartType = {
  area: {
    component: StockAreaChart,
    mapFunc: mapArea
  },
  candle: {
    component: StockCandleChart,
    mapFunc: mapCandle
  }
};

const parseData = (data, type) => {
  return data.map(chartType[type].mapFunc);
}

export const TerminalGraph = (props) => {
  const { chart, type } = props;
  const data = chart ? parseData(chart, type) : [];
  const Chart = chartType[type].component;
  return data.length > 0 ? (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__graph-wrap`}>
        <Chart
          width={document.documentElement.clientWidth - 800}
          height={391}
          type="canvas+svg"
          data={data}
          range={200}
        />

      </div>
    </div>
  ) : null;
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
