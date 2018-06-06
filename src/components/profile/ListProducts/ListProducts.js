import React from 'react';
import { Button } from '@components/common/Button';
import { ProfileProduct } from '../ProfileProduct';

const ROOT_CLASS = 'list-products';

export const ListProducts = props => {

  const renderTitle = () => {
    return (
      <div className={`${ROOT_CLASS}__list-title`}>
        You need to add new API Keys
      </div>
    );
  }

  const renderProducts = () => {
    let res = [];
    console.log(props.products);
    props.products.map((product, index) => {
      res.push(<ProfileProduct exchange={product} key={index} />);
    });
    return res;
  }

  const renderList = () => {
    let result;
    props.products.length > 0 ?
      result = renderProducts() :
      result = renderTitle();
    return result;
  }

  return (
    <div>
      <div className={ROOT_CLASS}>
        <div className={`${ROOT_CLASS}__button-block`}>
          <div className={`${ROOT_CLASS}__caption`}>Current Fund’s API</div>
          <div className={`${ROOT_CLASS}__button-block`}>
            <div className={`${ROOT_CLASS}__help`}>Where to get API Key?</div>
            <Button theme='product-btn' NameBtn="Add new API" onClick={() => {props.onClickAddProduct()}} />
          </div>
        </div>
        <div className={`${ROOT_CLASS}__list`}>
          {renderList()}
        </div>
      </div>
    </div>
  );
};

// <ProfileProduct
//   exchange="binance"
//   number={12000.00}
//   number2={7438.2181}
//   connect={'Connected to BNX'}
// />
// <ProfileProduct
//   exchange="poloniex"
//   number={12000.00}
//   number2={7438.2181}
//   connect={'Disconnected'}
// />
// <ProfileProduct
//   exchange="bittrex"
//   number={12000.00}
//   number2={7438.2181}
//   connect={'Free to Use'}
// />
// <ProfileProduct
//   exchange="kucoin"
//   number={12000.00}
//   number2={7438.2181}
//   connect={'Disconnected'}
// />
