import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    type: 'area',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    text: '',
  },
  xAxis: {
    type: 'datetime',
    allowDecimals: false,
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
  }));

  return(
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...options,
        series: renderedSeries,
      }}
    />
  );
};
