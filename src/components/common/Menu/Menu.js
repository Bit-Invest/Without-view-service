import * as React from 'react';
import { MenuItem } from '@common/MenuItem';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'saved', 'billing', 'profile', 'help'];
const inDev = ['billing', 'help', 'saved'];
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
                push={props.push}
                showPopUp={props.showPopUp}
              />
            </div>
          )}
      </div>
    </div>
  );
}
