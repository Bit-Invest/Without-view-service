import * as React from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { scaleTime } from "d3-scale";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { utcDay } from "d3-time";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

const ROOT_CLASS = 'stock-candle-chart';

export const StockCandleChart = (props) => {
  const { data, width, height, type } = props;
  const xAccessor = d => d.date;
  const xExtents = [
    xAccessor(data[0]),
		xAccessor(data[data.length - 1])
	];
  return (
    <div className={ROOT_CLASS}>
      <ChartCanvas
        width={width}
        height={height}
        type={type}
        ratio={1}
        seriesName="MSFT"
				data={data}
        xAccessor={d => d.date}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
        </Chart>
      </ChartCanvas>
    </div>
  );
}
