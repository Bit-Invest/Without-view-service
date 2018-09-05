import * as React from 'react';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'add-product';

export const AddProduct = (props) => {
  return (
    <div className={ROOT_CLASS} onClick={props.onClick}>
      <div className={`${ROOT_CLASS}__plus`}>
        <div className={`${ROOT_CLASS}__icon`}></div>
      </div>
      <div className={`${ROOT_CLASS}__title`}>
        { objectLangs[lng]['AddProduct#1'] }
      </div>
    </div>
  );
}
