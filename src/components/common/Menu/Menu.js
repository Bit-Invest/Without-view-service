import * as React from 'react';
import { MenuItem } from '@common/MenuItem';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpRegistration } from '@common/PopUps/PopUpRegistration';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'save', 'billing', 'profile', 'help'];
const inDev = ['billing', 'help', 'save'];

export const Menu = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page}`;
  }

  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__items`}>
        <div className={`${ROOT_CLASS}__logo`}></div>
        {ITEMS.map((item, index) =>
          <div className={`${ROOT_CLASS}__item-wrap`} key={index}>
            <MenuItem
              type={item}
              isActive={props.page === item}
              inDev={inDev.indexOf(item) >= 0}
              onClick={props.onClickInDev}
            />
          </div>
        )}
      </div>
      <PopUpManager
        isShowed={props.isShowedPopUp}
        onClickClose={props.onClosePopUp}
      >
        <PopUpRegistration />
      </PopUpManager>
    </div>
  );
}
