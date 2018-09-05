import * as React from 'react';
import { TraderCard } from '@marketplace/TraderCard';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'products';

export const Products = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__header`}>
        <div className={`${ROOT_CLASS}__title`}>{ objectLangs[lng]['Products#1'] }</div>
        <div className={`${ROOT_CLASS}__add-product`}></div>
      </div>
      <div className={`${ROOT_CLASS}__list`}>
        {props.products.map((product, index) => {
          return (
            <TraderCard
              {...product}
              key={index}
              theme={props.role}
            />
          );
        })}
      </div>
    </div>
  );
}
