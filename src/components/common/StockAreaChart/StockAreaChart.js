import * as React from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { scaleTime } from "d3-scale";

const ROOT_CLASS = 'stock-area-chart';

export const StockChart = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <ChartCanvas
        width={props.width}
        height={props.height}
        seriesName="MSFT"
        data={props.data}
        xAccessor={d => d.date}
        xScale={scaleTime()}
        xExtents={[new Date(props.startTimestamp), new Date(props.lastTimestamp)]}
      >
        <Chart id={0} yExtents={d => d.close}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" />
          <AreaSeries
            yAccessor={d => d.close}
            stroke="#d36bf5"
            strokeWidth={2}
            fill="rgba(0, 0, 0, 0)"
            interpolation={curveMonotoneX}
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
}
