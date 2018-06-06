import React from 'react';
import { Link } from 'react-router-dom';

const ROOT_CLASS = 'profile-product';

// const statusConnect = ['Connected to BNX', 'Disconnected', 'Free to Use'];

export const ProfileProduct = props => {
  return (
    <Link to={`/product/${props.id}`} className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__exchange ${ROOT_CLASS}__exchange_${props.exchange}`}></div>
      <div className={`${ROOT_CLASS}__block-currency`}>
        <div className={`${ROOT_CLASS}__img-currency-btc`}></div>
        <div className={`${ROOT_CLASS}__number`}>{props.number}</div>
      </div>
      <div className={`${ROOT_CLASS}__block-currency`}>
        <div className={`${ROOT_CLASS}__img-currency-usd`}></div>
        <div className={`${ROOT_CLASS}__number`}>{props.number2}</div>
      </div>
      <div className={`${ROOT_CLASS}__result-connect`}>Disconnected</div>
    </Link>
  );
}
