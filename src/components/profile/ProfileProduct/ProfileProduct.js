import React from 'react';

const ROOT_CLASS = 'profile-product-block';

export const ProfileProduct = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__name-product`}>XML</div>
      <div className={`${ROOT_CLASS}__index`}>Index</div>
      <div className={`${ROOT_CLASS}__data-product`}>today 19%</div>
      <div className={`${ROOT_CLASS}__result-product`}>+213%</div>
    </div>
  );
}
