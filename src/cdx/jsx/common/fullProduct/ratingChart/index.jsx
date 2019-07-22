import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more' //module

HC_more(Highcharts) //init module

const options = {
  chart: {
    polar: true,
    type: 'area',
    width: 300,
    height: 300,
    margin: [0, 0, 0, 0],
    backgroundColor: null,
  },
  title: {
    text: null
  },
  pane: {
    size: '40%'
  },
  yAxis: {
    gridLineInterpolation: 'polygon',
    lineWidth: 0,
    title: {
      text: '',
      align: 'high',
    },
    labels:{
      enabled:false,
    },
    align: 'center',
  },
  tooltip: {
    shared: false,
  },
  legend: {
    enabled: false
  },   
  credits: {
    enabled: false
  }, 
  plotOptions: {
    series: {
      fillColor: {
        linearGradient: [0, 200],
        stops: [
          [0, 'rgba(234, 34, 196, .2)'],
          [1, 'rgb(128, 127, 206)'],
        ],
      },
    },
  },
};

export default (props) => {
  if (!props.ratingValues) {
    return <div>processing...</div>;
  }
  
  let stepes = {
    "MaxDrawdown": [
      0,
      5,
      15,
      45,
      80,
      100,
      
    ],
    "DmaxDD": [
      0,
      5,
      15,
      45,
      80,
      100,
    ],
    "IncomeAverage": [
      -100,
      0.00001,
      0.005,
      0.09,
      0.5,
      1.5,
    ],
    "Volatility": [
      0,
      0.01,
      0.1,
      0.5,
      1.0,
      2.5,
    ],
    "Income": [
       0,
      5,
      15,
      45,
      80,
      100,
    ],
  };

  let getStepPoint = (index, value) => {
    return stepes[index].reduce((pr, cur, index2, arr) => {
      return pr === false ? ((value >= cur && value <= (arr[index2+1] || Infinity)) ? index2 : false) : pr;
    }, false) || 0;
  };

  let polarItems = Object.keys(props.ratingValues)
    .reduce((pr, cur) => (pr[cur] = (props.ratingValues[cur] * 100).toFixed(2), pr)
    , {});

  let polarItemsChart = Object.keys(polarItems).map((cur, index, arr) => 
    (getStepPoint(cur, polarItems[cur]) * 10) + 10
  );

  return(
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...options,
        xAxis: {
          categories: Object.keys(polarItems),
          tickmarkPlacement: 'on',
          lineWidth: 0,
        },
        series: [{
          data: polarItemsChart,
          pointPlacement: 'on',
        }],
      }}
    />
  );
};
