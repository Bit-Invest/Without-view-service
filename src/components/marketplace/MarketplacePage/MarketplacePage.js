import * as React from 'react';
import { TraderCard } from '../TraderCard/TraderCard'
import { Page } from '@common/Page';

const ROOT_CLASS = 'marketplace-page';

export const MarketplacePage = props => {
  return (
    <Page>
      <div className={ROOT_CLASS}>
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
        <TraderCard exchange='BNX' />
      </div>
    </Page>
  );
};
