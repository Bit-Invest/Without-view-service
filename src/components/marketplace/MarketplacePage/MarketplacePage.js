import * as React from 'react';
import { TraderCard } from '../TraderCard/TraderCard'
import { Page } from '@common/Page';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpNewProduct } from '@common/PopUps/PopUpNewProduct';

const ROOT_CLASS = 'marketplace-page';

export const MarketplacePage = props => {
  return (
    <Page isLoaded={props.isLoaded}>
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
        <PopUpManager>
          <PopUpNewProduct />
        </PopUpManager>
      </div>
    </Page>
  );
};
