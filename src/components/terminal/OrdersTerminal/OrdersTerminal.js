import * as React from 'react';
import { OpenOrders } from '@terminal/OpenOrders';
import { FillOrders } from '@terminal/FillOrders';
import { Tabs } from '@common/Tabs';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'orders-limit';

export const OrdersTerminal = props => {
  return (
    <div className={ROOT_CLASS}>
      <Tabs
        tabs={[
          {
            title: objectLangs[lng]['OrdersTerminal#1'],
            content: <OpenOrders orders={props.openOrders} />
          },
          {
            title: objectLangs[lng]['OrdersTerminal#2'],
            content: <FillOrders orders={props.fillOrders} />
          }
        ]}
      />
    </div>
  )
}
