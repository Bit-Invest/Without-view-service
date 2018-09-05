import React from 'react';
import { Button } from '@components/common/Button';
import { ProfileProduct } from '../ProfileProduct';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'list-products';

export const ListProducts = props => {

  const renderTitle = () => {
    return (
      <div className={`${ROOT_CLASS}__list-title`}>
        { objectLangs[lng]['ListProducts#1'] }
      </div>
    );
  }

  const renderProducts = () => {
    let res = [];
    props.products.forEach((product, index) => {
      res.push(<ProfileProduct {...product} key={index} />);
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
          <div className={`${ROOT_CLASS}__caption`}>{ objectLangs[lng]['ListProducts#2'] }</div>
          <div className={`${ROOT_CLASS}__button-block`}>
            <div className={`${ROOT_CLASS}__help`}>{ objectLangs[lng]['ListProducts#3'] }</div>
            <Button
              theme='product-btn'
              NameBtn={ objectLangs[lng]['ListProducts#4'] }
              onClick={() => {props.onClickAddProduct()}}
            />
          </div>
        </div>
        <div className={`${ROOT_CLASS}__list`}>
          {renderList()}
        </div>
      </div>
    </div>
  );
};
