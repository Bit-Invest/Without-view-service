import * as React from 'react';
import { Link } from 'react-router-dom';

const ROOT_CLASS = 'menu-item';

export const MenuItem = (props) => {

  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.type}_${props.isActive ?
        'active' : 'disabled'}`;
  };

  let result = null;
  if (props.inDev) {
    result = (
      <div
        onClick={props.onClick}
        className={buildRootClass()}
      ></div>
    );
  } else {
    result = (
      <Link to={`/${props.type}`}>
        <div
          className={buildRootClass()}
        ></div>
      </Link>
    );
  }
  return result;
}
