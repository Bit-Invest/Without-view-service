import * as React from 'react';
import { StockCandleChart } from '@common/StockCandleChart';
import { StockAreaChart } from '@common/StockAreaChart';
import moment from 'moment'
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

const changeDate = (data, props) => {
  let filterData
  if (props.dateFilterValue) {
    let subtractMoment = ''
    switch (props.dateFilterValue) {
      case 'min':
        subtractMoment = moment().subtract(1, 'minute').format()
        break
      case '30_min':
        subtractMoment = moment().subtract(30, 'minute').format()
        break
      case 'hr':
        subtractMoment = moment().subtract(1, 'hour').format()
        break
      default:
        subtractMoment = moment().format()
    }
    filterData = data.filter(el => {
      return moment(el.date).format() <= moment().format() &&
              moment(el.date).format() >= subtractMoment
    })
  } else {
    filterData = data
  }
  return filterData
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
          data={changeDate(data, props)}
          range={200}
          axes
        />

      </div>
    </div>
  ) : null;
};
