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
            title: 'OPEN ORDERS',
            content: <OpenOrders orders={props.openOrders} />
          },
          {
            title: 'FILL ORDERS',
            content: <FillOrders />
          }
        ]}
      />
    </div>
  )
}
