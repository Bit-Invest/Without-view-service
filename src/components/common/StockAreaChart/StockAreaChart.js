import * as React from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { scaleTime } from "d3-scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { curveMonotoneX } from "d3-shape";
import {
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

const ROOT_CLASS = 'stock-area-chart';

const renderAxes = (props) => {
  const { width, height } = props;
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
  return props.axes ?
    (
      <div>
        <XAxis
					axisAt="bottom"
					orient="bottom"
					className={`${ROOT_CLASS}__axis ${ROOT_CLASS}__axis_x`}
					{...xGrid}
					stroke={props.stockProps ? props.stockProps.stroke : '#FFFFFF'}
					tickStroke={props.stockProps ? props.stockProps.tickStroke : '#FFFFFF'}
					ticks={6}
				/>
        <YAxis
					axisAt="left"
					orient="left"
					className={`${ROOT_CLASS}__axis ${ROOT_CLASS}__axis_y`}
					{...yGrid}
					stroke={props.stockProps ? props.stockProps.stroke : '#FFFFFF'}
					tickStroke={props.stockProps ? props.stockProps.tickStroke : '#FFFFFF'}
					ticks={6}
				/>
      </div>
    ) :
    null;
}

export const StockAreaChart = (props) => {
  const { data, width, height, zoom } = props;
  const xAccessor = d => d.date;
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
        zoomEvent={zoom}
      >
        <Chart id={0} yExtents={d => d.close}>
          {renderAxes(props)}
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%H:%M:%S")} />
          <MouseCoordinateY
            at="left"
            orient="right"
            displayFormat={format(".6f")} />
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
