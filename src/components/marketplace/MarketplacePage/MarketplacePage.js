import * as React from 'react';
import { TraderCard } from '../TraderCard/TraderCard'
import { Page } from '@common/Page';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpRegistration } from '@common/PopUps/PopUpRegistration';

const ROOT_CLASS = 'marketplace-page';

export const MarketplacePage = props => {
  return (
    <Page isLoaded={props.isLoaded}>
      <div className={ROOT_CLASS}>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
        <TraderCard exchange='BNX' id={1} onClickCompare={props.onClickCompare}/>
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
