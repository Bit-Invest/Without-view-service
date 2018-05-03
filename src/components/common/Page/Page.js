import * as React from 'react';
import { Menu } from '../Menu';
import { PopUpManager } from '@common/PopUpManager';

const ROOT_CLASS = 'page';

export const Page = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page}`;
  }
  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__content-wrap`}>
        <div className={`${ROOT_CLASS}__menu-wrap`}>
        </div>
        <div className={`${ROOT_CLASS}__content`}>
          {props.children}
        </div>
      </div>
      <div className={`${ROOT_CLASS}__disclaimer`}>
        © 2018 CryptoActive | Privacy Policy & Terms of Service
      </div>
      <PopUpManager>
        POP_UP
      </PopUpManager>
    </div>
  );
}
// <div className={`${ROOT_CLASS}__logo`}></div>
// <div className={`${ROOT_CLASS}__menu`}>
//   <Menu page={props.page} push={props.push} />
// </div>
