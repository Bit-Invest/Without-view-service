import * as React from 'react';

const ROOT_CLASS = 'page';

export const Page = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page}`;
  }

  let preloaderClass = `${ROOT_CLASS}__preloader`;
  let childClass = `${ROOT_CLASS}__child`;
  if (props.isLoaded) {
    preloaderClass += ` ${preloaderClass}_hidden`;
  } else {
    child += ` ${childClass}_hidden`;
  }

  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__content-wrap`}>
        <div className={`${ROOT_CLASS}__menu-wrap`}>
        </div>
        <div className={`${ROOT_CLASS}__content`}>
          <div className={`${preloaderClass}`}></div>
          <div className={`${childClass}`}>
            {props.children}
          </div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__disclaimer`}>
        © 2018 CryptoActive | Privacy Policy & Terms of Service
      </div>
    </div>
  );
}
