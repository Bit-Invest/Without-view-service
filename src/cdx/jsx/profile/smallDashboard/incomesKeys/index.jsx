import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

const options = {
  chart: {
    type: 'area',
  },
  title: {
    text: '',
  },
  yAxis: {
    title: {
      enabled: false,
    },
    showFirstLabel: false,
    showLastLabel: true,
    // min: Math.min(...generalData),
    // max: Math.max(...generalData),
  },
  rangeSelector: {
    selected: 1,
  },
  legend: {
    enabled: true,
    itemStyle: {
      color: '#b1b1b1',
      fontWeight: 'bold'
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    area: {
      marker: {
        radius: 2,
      },
    },
  },
};

export default (props) => {
  if (!props.income || !props.income.length) 
    return(
      <div className="noLoadedProfit">Product processing...</div>
    );

  const { income } = props;
  const renderedSeries = income.map(curIncome => ({
    name: curIncome.name,
    data: (curIncome.income || []).map(cur => [new Date(cur.timestamp).getTime(), parseFloat((cur.value).toFixed(2))]),
    type: 'area',
    gapSize: 5,
    tooltip: {
      valueDecimals: 2
    },
    fillColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
      },
      stops: [
        [0, '#FF74F5'],
        [1, '#A03AFF'],
      ],
    },
    threshold: null,
  }));

  return(
    <ReactHighstock
      config={{
        ...options,
        series: renderedSeries,
      }}
    />
  );
};
