import * as React from 'react';
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
          type="hybrid"
          data={data}
          range={200}
          axes
        />

      </div>
    </div>
  ) : null;
};
