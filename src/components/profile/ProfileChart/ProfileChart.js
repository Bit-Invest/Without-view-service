import * as React from 'react';
import { Balance } from '@profile/Balance';
import { StockAreaChart } from '@common/StockAreaChart';
import { ProfileChartButton } from '@profile/ProfileChartButton';

const ROOT_CLASS = 'profile-chart';

export const ProfileChart = (props) => {
  const renderChart = () => {
    return props.data.length > 0 ?
      (
        <StockAreaChart
          width={document.documentElement.clientWidth - 253}
          height={270}
          type="hybrid"
          data={props.data}
          stockProps={{
            stroke: "#494a4e",
            tickStroke: "rgba(255, 255, 255, 0.2)"
          }}
          axes
        />
      ) :
      null;
  }
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__balance-wrap`}>
        <div className={`${ROOT_CLASS}__products`}>
          {props.products.map((product, index) => {
            return (
              <ProfileChartButton
                title={product.nameProduct}
                id={product.id}
                onClick={props.onClickProduct}
                isActive={props.currentProduct === product.nameProduct}
                key={index}
              />
            );
          })}
        </div>
        <div className={`${ROOT_CLASS}__balance`}>
          <Balance
            base={props.currentBalance ? props.currentBalance.value : ''}
            baseCurrency={props.currentBalance ? props.currentBalance.symbol : ''}
          />
        </div>
      </div>
      <div className={`${ROOT_CLASS}__chart`}>
        {renderChart()}
      </div>
    </div>
  );
}
