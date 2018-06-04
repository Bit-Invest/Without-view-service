import * as React from 'react';
import { Link } from 'react-router-dom';

const ROOT_CLASS = 'menu-item';

export const MenuItem = (props) => {

  const buildIconClass = () => {
    const iconClass = `${ROOT_CLASS}__icon`;
    return `${iconClass} ${iconClass}_${props.type}_${props.isActive ?
        'active' : 'disabled'}`;
  };

  let result = null;
  if (props.inDev) {
    result = (
      <div className={ROOT_CLASS}>
        <div
          onClick={props.onClick}
          className={buildIconClass()}
        ></div>
        <div className={`${ROOT_CLASS}__title`}>
          {props.type.toUpperCase()}
        </div>
      </div>
    );
  } else {
    result = (
      <Link to={`/${props.type}`}>
        <div className={ROOT_CLASS}>
          <div
            className={buildIconClass()}
          ></div>
          <div className={`${ROOT_CLASS}__title`}>
            {props.type.toUpperCase()}
          </div>
        </div>
      </Link>
    );
  }
  return result;
}
