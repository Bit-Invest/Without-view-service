import * as React from 'react';
import { TraderCard } from '../TraderCard/TraderCard'

const ROOT_CLASS = 'marketplace-page';

export const MarketplacePage = props => {
  return (
    <div className={ROOT_CLASS}>
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
      <TraderCard />
    </div>
  );
};
