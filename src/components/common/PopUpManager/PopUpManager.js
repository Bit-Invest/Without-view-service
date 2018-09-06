import * as React from 'react';

const ROOT_CLASS = 'pop-up-manager';

export const PopUpManager = (props) => {
  const buildRootClass = () => {
    return ROOT_CLASS + (props.isShowed ? '' : ` ${ROOT_CLASS}_hidden`);
  }
  return (
    <div className={buildRootClass()}>
      <div onClick={props.onClickClose} className={`${ROOT_CLASS}__undercover`}>
        <div className={`${ROOT_CLASS}__content-wrap ${ROOT_CLASS}__for-background-click`}>
          <div className={`${ROOT_CLASS}__content`}>
            {props.children}
          </div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__content-wrap`}>
        <div onClick={props.onClickClose} className={`${ROOT_CLASS}__close`}>
          <div className={`${ROOT_CLASS}__check`} alt="close"></div>
        </div>
        <div className={`${ROOT_CLASS}__content`}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
