import React from 'react';
import { Link } from 'react-router-dom';

const ROOT_CLASS = 'profile-product';

export const ProfileProduct = props => {
  return (
    <Link to={`/product/${props.id}`} className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__name-product`}>{props.name}</div>
      <div className={`${ROOT_CLASS}__index`}>Index</div>
      <div className={`${ROOT_CLASS}__data-product`}>{props.today}%</div>
      <div className={`${ROOT_CLASS}__result-product`}>{props.rate}%</div>
    </Link>
  );
}
