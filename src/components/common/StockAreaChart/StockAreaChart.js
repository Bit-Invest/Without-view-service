import * as React from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { scaleTime } from "d3-scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { curveMonotoneX } from "d3-shape";

const ROOT_CLASS = 'stock-area-chart';

export const StockAreaChart = (props) => {
  const { data, width, height, range } = props;
  const xAccessor = d => d.date;
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
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        ratio={1}
        xExtents={[xAccessor(data[0]), xAccessor(data[data.length - 1])]}
      >
        <Chart id={0} yExtents={d => d.close}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis axisAt="left" orient="left" ticks={6} />
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
