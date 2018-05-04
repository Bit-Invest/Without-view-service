import * as React from 'react';
import { Link } from 'react-router-dom';

const ROOT_CLASS = 'menu-item';

export const MenuItem = (props) => {

  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.type}_${props.isActive ?
        'active' : 'disabled'}`;
  };

  return (
    <Link to={`/${props.type}`}>
      <div
        className={buildRootClass()}
      ></div>
    </Link>
  );
}
