import * as React from 'react';

const ROOT_CLASS = 'icon';

export const Icon = (props) => {
  return (
    <svg
      className={
        `${ROOT_CLASS} ${ROOT_CLASS}_type_${props.type} ${props.className}`
      }
      onClick={props.onClick}
    >
      <use xlinkHref={`#${props.type}`}></use>
    </svg>
  );
}
