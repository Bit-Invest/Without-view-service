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
import { TrendLine } from "react-stockcharts/lib/interactive";

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

export class StockAreaChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enableTrendLine: false,
			trends: [],
    }
  }

  onDrawCompleteChart = (trends) => {
    this.setState({
      enableTrendLine: false,
      trends
    });
  }

  render() {
    const { data, width, height, zoom } = this.props;
    const xAccessor = d => d.date
    return this.props.data && this.props.data.length > 2 ? (
      <div className={ROOT_CLASS}>
        { this.props.isTermanal ? <button className="stock-area-chart__drawing-line" onClick={() => this.setState({enableTrendLine: true})}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.354 21.354l14-14-.707-.707-14 14z"></path><path d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></button> : null }
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
          type='hybrid'
        >
          <Chart id={0} yExtents={d => d.close}>
            {renderAxes(this.props)}
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
            { this.props.isTermanal ?
              <TrendLine
                enabled={this.state.enableTrendLine}
                type="RAY"
                snap={false}
                onComplete={this.onDrawCompleteChart}
                trends={this.state.trends}
              /> :
              null 
            }
          </Chart>
        </ChartCanvas>
      </div>
    ) : null;
  }
}
