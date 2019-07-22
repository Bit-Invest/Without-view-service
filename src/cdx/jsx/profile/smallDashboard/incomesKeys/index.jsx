import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

const options = {
  chart: {
    type: 'area',
    backgroundColor: '#3C054D',
  },
  title: {
    text: '',
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
  rangeSelector: {
    selected: 4,
    inputEnabled: false,
    labelStyle: {
      visibility: 'hidden',
    },
  },
};

// const arrRgbGradientColors = [
//   '0, 128, 0',
//   '0, 0, 255',
//   '255, 255, 0',
//   '255, 165, 0',
// ];

export default (props) => {
  if (!props.income || !props.income.length) 
    return(
      <div className="noLoadedProfit">Product processing...</div>
    );

  const { income, valuePrefix, valueSuffix } = props;
  const renderedSeries = income.map((curIncome, index) => ({
    name: curIncome.name,
    data: (curIncome.income || []).map(cur => [new Date(cur.timestamp).getTime(), parseFloat((cur.value).toFixed(2))]),
    type: 'area',
    gapSize: 5,
    tooltip: {
      valueDecimals: 2,
      valuePrefix: valuePrefix,
      valueSuffix: valueSuffix,
    },
    // fillColor: {
    //   linearGradient: {
    //     x1: 0,
    //     y1: 0,
    //     x2: 0,
    //     y2: 1,
    //   },
    //   stops: [
    //     [0, `rgba(${arrRgbGradientColors[index]}, ${1/(5/(index+1))})`], 
    //     [0, `rgba(${arrRgbGradientColors[index]}, ${1/(5/(index+1))/2})`],
    //   ],
    // },
    threshold: null,
  }));

  const allIncomesValues = income.reduce((res, curIncome) => {
    res.push(...(
      (curIncome.income || []).map(curObjValue => curObjValue.value)
    ));

    return res;
  }, []);
  
  return(
    <ReactHighstock
      config={{
        ...options,
        series: renderedSeries,
        yAxis: {
          title: {
            enabled: false,
          },
          showFirstLabel: false,
          showLastLabel: true,
        },
        // xAxis: {
        //   minRange: 0.000000001,
        // },
        // xAxis: {
        //   min: Math.min(...(allIncomesValues || [])),
        //   max: Math.max(...(allIncomesValues || [])),
        //   min: 0.0000000001,
        //   minRange: 0.00000001,
        // },
      }}
    />
  );
};
