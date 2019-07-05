import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    type: 'area',
    height: 150,
    margin: [0, 0, 0, 0],
    backgroundColor: null,
  },
  title: {
    style: {
      display: 'none',
    },
	},
	subtitle: {
    text: '',
    style: {
      display: 'none',
    },
	},
  xAxis: {
    type: 'datetime',
    allowDecimals: false,
    title: {
    	style: {
	      display: 'none',
	    },
    },
    labels: {
      enabled: false,
    },
  },
  yAxis: {
    title: {
      style: {
	      display: 'none',
	    },
    },
    labels: {
      enabled: false,
    },
    gridLineColor: 'rgba(0,0,0,0)',
  },
 	legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      lineWidth: 4,
      fillOpacity: 0.5,
    },
  },
  tooltip: {
    pointFormat: '{series.name} {point.y}',
    shared: true,
  },
};

export default (props) => {
  if (!props.income || !props.income.length) 
    return(
      <div className="noLoadedProfit">Product processing...</div>
    );

	return(
		<HighchartsReact
      highcharts={Highcharts}
      options={{
      	...options,
      	series: [{
      		name: 'Profit %',
      		data: props.income.map(cur => [new Date(cur.timestamp).getTime(), parseFloat((cur.value).toFixed(2))]),
          color: {
            linearGradient: [0, 200],
            stops: [
              [0, 'rgba(234, 34, 196, .2)'],
              [1, 'rgb(128, 127, 206)'],
            ],
          },
      	}],
      }}
    />
	);
};
