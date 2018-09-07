import * as React from 'react';
import { objectLangs, lng } from '../../../lngs/index';

const ROOT_CLASS = 'menu-item';

const linkedMenuStr = {
  'marketplace': 'Menu#2',
  'profile': 'Menu#3',
  'terminal': 'Menu#1'
};

export const MenuItem = (props) => {
  const buildIconClass = () => {
    const iconClass = `${ROOT_CLASS}__icon`;
    return `${iconClass} ${iconClass}_${props.type}`;
  };

  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.page} ${props.isActive ? ROOT_CLASS + '_active': ''}`;
  }

  const onClickItem = () => {
    if (!props.popUp) {
      props.push(`/${props.type}`);
    } else if (props.popUp === 'onlyRegistrated') {
      props.user.status === 'logged-in' ?
        props.push(`/${props.type}`) :
        props.showPopUp('registration');
    } else if (props.popUp === 'inDev') {
      props.showPopUp('comingSoon');
    }
  }

  return (
    <div className={buildRootClass()} onClick={onClickItem}>
      <div className={buildIconClass()}></div>
      <div className={`${ROOT_CLASS}__title`}>
        { objectLangs[lng][linkedMenuStr[props.type]].toUpperCase() }
      </div>
    </div>
  );
}
