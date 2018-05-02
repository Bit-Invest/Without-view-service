import * as React from 'react';
import { MenuItem } from '../MenuItem';

const ROOT_CLASS = 'menu';

const ITEMS = ['terminal', 'marketplace', 'billing', 'profile', 'help'];

export const Menu = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page}`;
  }

  const logoClass = () => {
    // return `${ROOT_CLASS}__logo`;
    let result = `${ROOT_CLASS}__logo`;
    if (props.exPage === 'profile' && props.page !== 'profile') {
      result += ` ${ROOT_CLASS}__logo_close-logo`;
    } else if (props.page === 'profile' && props.exPage !== 'profile') {
      result += ` ${ROOT_CLASS}__logo_open-logo`;
    }
    return result;
  }

  return (
    <div className={buildRootClass()}>
      <div className={logoClass()}></div>
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
