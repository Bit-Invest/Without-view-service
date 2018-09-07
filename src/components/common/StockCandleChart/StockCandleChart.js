import * as React from 'react';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { utcMinute } from "d3-time";
import { scaleTime } from "d3-scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { TrendLine } from "react-stockcharts/lib/interactive";

const ROOT_CLASS = 'stock-candle-chart';

export class StockCandleChart extends React.Component {
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
    const { data, width, height, type } = this.props;
    const isNeedShow = data && data.length > 2;
    let xAccessor = null;
    let xExtents = null;
    if (isNeedShow) {
      xAccessor = d => d.date;
      xExtents = [
        xAccessor(data[0]),
        xAccessor(data[data.length - 1])
      ];
    }
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
    return isNeedShow ? (
      <div className={ROOT_CLASS}>
        { this.props.isTermanal ? <button className="stock-area-chart__drawing-line" onClick={() => this.setState({enableTrendLine: true})}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.354 21.354l14-14-.707-.707-14 14z"></path><path d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></button> : null }
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
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={5}
              stroke="rgba(255, 255, 255, 0)"
              tickStroke="#FFFFFF"
              {...xGrid}
            />
            <YAxis
              axisAt="left"
              orient="left"
              ticks={5}
              stroke="rgba(255, 255, 255, 0)"
              tickStroke="#FFFFFF"
              {...yGrid}
            />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")} />
            <MouseCoordinateY
              at="left"
              orient="right"
              displayFormat={format(".6f")} />
            <CandlestickSeries width={timeIntervalBarWidth(utcMinute)}/>
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
