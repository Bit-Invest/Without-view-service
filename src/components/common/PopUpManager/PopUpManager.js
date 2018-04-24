import * as React from 'react';
import './PopUpManager.css';

const ROOT_CLASS = 'pop-up-manager';

export const PopUpManager = (props) => {
  const buildRootClass = () => {
    return ROOT_CLASS + (props.isShowed ? '' : ` ${ROOT_CLASS}_hidden`);
  }
  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__undercover`} onClick={props.onClickClose}>
        <div className={`${ROOT_CLASS}__content-wrap`}>
          <div
            className={`${ROOT_CLASS}__close`}
            onClick={props.onClickClose}
          >
            <div className={`${ROOT_CLASS}__close-title`}>Close</div>
            <div className={`${ROOT_CLASS}__check`} alt="close"></div>
          </div>
          <div className={`${ROOT_CLASS}__content`}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
