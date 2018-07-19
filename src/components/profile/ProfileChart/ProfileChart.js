import * as React from 'react';
import { Balance } from '@profile/Balance';

const ROOT_CLASS = 'profile-chart';

export const ProfileChart = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__balance`}>
        <Balance
          base={25.7}
          baseCurrency="BTC"
          second={181.488}
          secondCurrency="USD"
        />
      </div>
    </div>
  );
}
