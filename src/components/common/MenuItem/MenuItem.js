import * as React from 'react';

const ROOT_CLASS = 'menu-item';

export const MenuItem = (props) => {

  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.type}_${props.isActive ?
        'active' : 'disabled'}`;
  };

  return (
    <div
      className={buildRootClass()}
      onClick={() => {props.push(`/${props.type}`)}}
    ></div>
  );
}
