import * as React from 'react';

const ROOT_CLASS = 'add-product';

export const AddProduct = (props) => {
  return (
    <div className={ROOT_CLASS} onClick={props.onClick}>
      <div className={`${ROOT_CLASS}__plus`}>
        <div className={`${ROOT_CLASS}__icon`}></div>
      </div>
      <div className={`${ROOT_CLASS}__title`}>
        Add Product
      </div>
    </div>
  );
}
