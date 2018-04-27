import * as React from 'react';
import { MenuItem } from '../MenuItem';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'billing', 'profile', 'help'];

export const Menu = (props) => {
  console.log(props);
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page}`;
  }

  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__logo`}></div>
      {ITEMS.map((item, index) =>
        <div className={`${ROOT_CLASS}__item-wrap`} key={index}>
          <MenuItem
            type={item}
            isActive={props.page === item}
            push={props.push}
          />
        </div>
      )}
    </div>
  );
}
