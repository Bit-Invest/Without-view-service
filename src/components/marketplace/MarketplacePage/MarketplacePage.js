import * as React from 'react';
import { TraderCard } from '../TraderCard';
import { TraderCardList } from '../TraderCardList';
import { Page } from '@common/Page';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpRegistration } from '@common/PopUps/PopUpRegistration';
import { Button } from '@components/common/Button';

const ROOT_CLASS = 'marketplace-page';

const ProductTypes = {
  CARD: TraderCard,
  LIST_ELEM: TraderCardList
};

export const MarketplacePage = props => {
  const ProductCard = ProductTypes[props.showType];
  return (
    <Page isLoaded={props.isLoaded}>
      <div className={`${ROOT_CLASS}__filter`}>
        <Button theme="theme-gradient" NameBtn="card" onClick={props.onClickCard} />
        <Button theme="theme-gradient" NameBtn="list" onClick={props.onClickList} />
      </div>
      <div className={ROOT_CLASS}>
        {props.cards.map(card => <ProductCard {...card} key={card.id}/>)}
        <PopUpManager
          isShowed={props.isShowedPopUp}
          onClickClose={props.onClosePopUp}
        >
        <PopUpRegistration />
        </PopUpManager>
      </div>
    </Page>
  );
};
