import * as React from 'react';
import { OpenOrders } from '@terminal/OpenOrders';
import { FillOrders } from '@terminal/FillOrders';
import { Tabs } from '@common/Tabs';

const ROOT_CLASS = 'orders-limit';

export const OrdersTerminal = props => {
  return (
    <div className={ROOT_CLASS}>
      <Tabs
        tabs={[
          {
            title: 'Open Orders',
            content: <OpenOrders />
          },
          {
            title: 'Fill Orders',
            content: <FillOrders />
          }
        ]}
      />
    </div>
  )
}
