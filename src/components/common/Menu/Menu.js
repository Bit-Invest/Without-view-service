import * as React from 'react';
import { MenuItem } from '@common/MenuItem';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpRegistration } from '@common/PopUps/PopUpRegistration';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'billing', 'profile', 'help'];
const inDev = ['billing', 'terminal', 'help'];

export const Menu = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page}`;
  }

  const logoClass = () => {
    let result = `${ROOT_CLASS}__logo`;
    if (props.exPage === 'profile' && props.page !== 'profile') {
      result += ` ${ROOT_CLASS}__logo_close-logo`;
    } else if (props.page === 'profile' && props.exPage !== 'profile') {
      result += ` ${ROOT_CLASS}__logo_open-logo`;
    }
    return result;
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
      <div className={logoClass()}></div>
      <div className={itemsClass()}>
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
