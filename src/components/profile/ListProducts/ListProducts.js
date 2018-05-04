import React from 'react';
import { Button } from '@components/common/Button';
import { ProfileProduct } from '../ProfileProduct';

const ROOT_CLASS = 'list-products';

export const ListProducts = props => {
  return (
    <div>
      <div className={ROOT_CLASS}>
        <div>
          <Button theme='product-btn' NameBtn="Add product" onClick={() => {props.onClickAddProduct()}} />
          <ProfileProduct name="XML" today={19} rate={213} />
          <ProfileProduct name="MDK" today={5} rate={103} />
          <ProfileProduct name="LKC" today={3} rate={157} />
        </div>
        <div>
          <ProfileProduct name="JRK" today={-3} rate={-70} />
          <ProfileProduct name="UKO" today={28} rate={-10} />
          <ProfileProduct name="OOL" today={14} rate={10} />
        </div>
      </div>
      <div className={`${ROOT_CLASS}__news`}></div>
    </div>
  );
};
