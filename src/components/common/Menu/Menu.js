import * as React from 'react';
import { MenuItem } from '../MenuItem';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'billing', 'profile', 'help'];

export const Menu = (props) => {
  return (
    <div className={ROOT_CLASS}>
      {ITEMS.map((item, index) =>
        <div className={`${ROOT_CLASS}__item-wrap`}>
          <MenuItem
            type={item}
            isActive={props.page === item}
            push={props.push}
            key={index}
          />
        </div>
      )}
    </div>
  );
}
