import * as React from 'react';
import { MenuItem } from '@common/MenuItem';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpRegistration } from '@common/PopUps/PopUpRegistration';
import { PopUpComingSoon } from '@common/PopUps/PopUpComingSoon';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'save', 'billing', 'profile', 'help'];
const inDev = ['billing', 'help', 'save'];
const onlyRegistrated = ['terminal', 'profile'];

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
                user={props.user}
                type={item}
                isActive={props.page === item}
                popUp={
                  inDev.indexOf(item) >= 0 ?
                  'inDev' : onlyRegistrated.indexOf(item) >= 0 ?
                  'onlyRegistrated' : null
                }
                onClickInDev={props.onClickInDev}
                onClickRegItem={props.onClickRegItem}
                push={props.push}
              />
            </div>
          )}
      </div>
      <PopUpManager
        isShowed={props.isShowedPopUpDev}
        onClickClose={props.onCloseDevPopUp}
      >
        <PopUpComingSoon />
      </PopUpManager>
      <PopUpManager
        isShowed={props.isShowedPopUpRegistration}
        onClickClose={props.onClosePopUpRegistration}
      >
        <PopUpRegistration />
      </PopUpManager>
    </div>
  );
}
