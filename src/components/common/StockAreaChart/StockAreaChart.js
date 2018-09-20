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
import { TrendLine,
         FibonacciRetracement,
         EquidistantChannel,
         GannFan,
        } from "react-stockcharts/lib/interactive";

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
      enableFib: false,
      enableEquidistantChannel: false,
      enableGannFan: false,
      enableInteractiveText: false,
      isDeleteFigure: false,
      trends: [],
      retracements: [],
      channels: [],
      fans: [],
      textList: []
    }
  }

  onDrawCompleteTrendLine = (trends) => {
    const mapTrends = [trends[trends.length - 1]].map(el => {
      return {
        ...el,
        appearance: {
          ...el.appearance,
          stroke: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
          width: 4
        },
      }
    })

    const newTrends = trends.splice(0, trends.length - 1).concat(mapTrends)

    this.setState({
      enableTrendLine: false,
      trends: newTrends
    })
  }

  onDrawCompleteFib = (retracements) => {
    const mapRetracements = [retracements[retracements.length - 1]].map(el => {
      return {
        ...el,
        appearance: {
          ...el.appearance,
          fontFill: '#ffffff',
          stroke: '#ffffff'
        }
      }
    })

    const newRetracements = retracements.splice(0, retracements.length - 1).concat(mapRetracements)

    this.setState({
      enableFib: false,
      retracements: newRetracements
    })
  }

  onDrawCompleteEquidistantChannel = (channels) => {
    const mapChannels = [channels[channels.length - 1]].map(el => {
      return {
        ...el,
        appearance: {
          ...el.appearance,
          stroke: '#ffffff',
        },
      }
    })

    const newChannels = channels.splice(0, channels.length - 1).concat(mapChannels)

    this.setState({
      enableEquidistantChannel: false,
      channels: newChannels
    })
  }

  onDrawCompleteGannFan = (fans) => {
    const mapFans = [fans[fans.length - 1]].map(el => {
      return {
        ...el,
        appearance: {
          ...el.appearance,
          fontFill: '#ffffff',
          stroke: '#ffffff'
        }
      }
    })

    const newFans = fans.splice(0, fans.length - 1).concat(mapFans)

    this.setState({
      enableGannFan: false,
      fans: newFans
    })
  }

  deleteFigure = () => {

  }

  render() {
    const { data, width, height, zoom } = this.props;
    const xAccessor = d => d.date
    return this.props.data && this.props.data.length > 2 ? (
      <div className={ROOT_CLASS}>
        { this.props.isTermanal ? <button className="stock-area-chart__drawing-line" onClick={() => this.setState({enableTrendLine: true})}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.354 21.354l14-14-.707-.707-14 14z"></path><path d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></button> : null }
        { this.props.isTermanal ? <button className="stock-area-chart__drawing-line" onClick={() => this.setState({enableFib: true})}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.463 12.026l13.537-7.167-.468-.884-13.537 7.167z"></path><path d="M22.708 16.824l-17.884 9.468.468.884 17.884-9.468z"></path><path d="M22.708 9.824l-15.839 8.386.468.884 15.839-8.386z"></path><path d="M5.5 14c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 21c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></button> : null }
        { this.props.isTermanal ? <button className="stock-area-chart__drawing-line" onClick={() => this.setState({enableEquidistantChannel: true})}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.551 17.98l13.284-7.033-.468-.884-13.284 7.033z"></path><path d="M6 11.801l16-8.471v4.17h1v-5.83l-18 9.529v5.301h1z"></path><path d="M6 24.67v-4.17h-1v5.83l18-9.529v-5.301h-1v4.699z"></path><path d="M5.5 20c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 11c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></button> : null }
        { this.props.isTermanal ? <button className="stock-area-chart__drawing-line" onClick={() => this.setState({enableGannFan: true})}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.354 21.354l7.097-7.097-.707-.707-7.097 7.097z"></path><path d="M17.249 11.458l7.105-7.105-.707-.707-7.105 7.105z"></path><path d="M7.542 22.683l17.296-2.739-.156-.988-17.296 2.739z" id="Line"></path><path d="M7.538 22.062l15.708-7.661-.438-.899-15.708 7.661z"></path><path d="M6.802 20.97l7.695-15.777-.899-.438-7.695 15.777z"></path><path d="M6.285 20.741l2.76-17.423-.988-.156-2.76 17.423z"></path><path d="M5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM15.5 14c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg></button> : null }
        { this.props.isTermanal && this.state.isDeleteFigure ? <button className="stock-area-chart__drawing-line" onClick={() => this.deleteFigure()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g><path fillRule="nonzero" d="M8 21c0 1.1.825 2 1.833 2h7.333c1.008 0 1.833-.9 1.833-2v-12h-11v12zm-1 0v-13h13v13c0 1.634-1.252 3-2.833 3h-7.333c-1.581 0-2.833-1.366-2.833-3z"></path><path d="M17 6l-1-1h-5l-1 1h-3v1h13v-1z"></path><path fillRule="nonzero" d="M10 11v9.062h1v-9.062z"></path><path fillRule="nonzero" d="M13 11v9.062h1v-9.062z"></path><path fillRule="nonzero" d="M16 11v9.062h1v-9.062z"></path></g></svg></button> : null }
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
                onComplete={this.onDrawCompleteTrendLine}
                trends={this.state.trends}
              /> :
              null
            }
            { this.props.isTermanal ?
              <FibonacciRetracement
                enabled={this.state.enableFib}
                retracements={this.state.retracements}
                onComplete={this.onDrawCompleteFib}
              /> :
              null
            }
            { this.props.isTermanal ?
              <EquidistantChannel
                enabled={this.state.enableEquidistantChannel}
                onComplete={this.onDrawCompleteEquidistantChannel}
                channels={this.state.channels}
              /> :
              null
            }
            { this.props.isTermanal ?
              <GannFan
                enabled={this.state.enableGannFan}
                onComplete={this.onDrawCompleteGannFan}
                fans={this.state.fans}
              /> :
              null
            }
          </Chart>
        </ChartCanvas>
      </div>
    ) : null;
  }
}
