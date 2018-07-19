import * as React from 'react';

const ROOT_CLASS = 'products';

export const Products = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__header`}>
        <div className={`${ROOT_CLASS}__title`}>CONNECTED PRODUCTS</div>
        <div className={`${ROOT_CLASS}__add-product`}></div>
      </div>
      <div className={`${ROOT_CLASS}__list`}></div>
    </div>
  );
}
