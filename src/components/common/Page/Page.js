import * as React from 'react';
import { PopUpManager } from '@components/PopUpManager';

const ROOT_CLASS = 'page';

export const Page = (props) => {
  return (
    <div className={ROOT_CLASS}>
      {props.children}
      <PopUpManager isShowed={props.isPopUpOpened} />
    </div>
  );
}
