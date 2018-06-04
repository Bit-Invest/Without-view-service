import * as React from 'react';
import { MenuItem } from '@common/MenuItem';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpRegistration } from '@common/PopUps/PopUpRegistration';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'save', 'billing', 'profile', 'help'];
const inDev = ['billing', 'terminal', 'help', 'save'];

export const Menu = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page}`;
  }

  const itemsClass = () => {
    let result = `${ROOT_CLASS}__items`;
    if (props.exPage === 'profile' && props.page !== 'profile') {
      result += ` ${ROOT_CLASS}__items_up`;
    } else if (props.page === 'profile' && props.exPage !== 'profile') {
      result += ` ${ROOT_CLASS}__items_down`;
    }
    return result;
  }

  return (
    <div className={buildRootClass()}>
      <div className={itemsClass()}>
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
