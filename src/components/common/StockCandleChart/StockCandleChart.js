import * as React from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { scaleTime } from "d3-scale";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { utcDay } from "d3-time";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

const ROOT_CLASS = 'stock-candle-chart';

export const StockCandleChart = (props) => {
  const { data, width, height, type, range } = props;
  const xAccessor = d => d.date;
  const xExtents = [
    xAccessor(data[0]),
		xAccessor(data[data.length - 1])
	];
  const xGrid = {
    innerTickSize: -1 * height,
    tickStrokeDasharray: 'Solid',
    tickStrokeOpacity: 0.1,
    tickStrokeWidth: 1
  };
  const yGrid = {
    innerTickSize: -1 * width,
    tickStrokeDasharray: 'Solid',
    tickStrokeOpacity: 0.1,
    tickStrokeWidth: 1
  };
  return (
    <div className={ROOT_CLASS}>
      <ChartCanvas
        width={width}
        height={height}
        type={type}
        ratio={1}
        seriesName="MSFT"
				data={data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={5} stroke="rgba(255, 255, 255, 0)" tickStroke="#FFFFFF" {...xGrid} />
          <YAxis axisAt="left" orient="left" ticks={5} stroke="rgba(255, 255, 255, 0)" tickStroke="#FFFFFF" {...yGrid} />
          <CandlestickSeries width={5}/>
        </Chart>
      </ChartCanvas>
    </div>
  );
}
