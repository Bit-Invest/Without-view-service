import * as React from 'react';
import { AddProduct } from '@profile/AddProduct';
import { Api } from '@profile/Api';

const ROOT_CLASS = 'apis';

export const Apis = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__head`}>
        <div className={`${ROOT_CLASS}__title`}>
          CURRENT FUND’S API
        </div>
        <AddProduct />
      </div>
      <div className={`${ROOT_CLASS}__list`}>
        {props.keys.map((burse, index) =>
          <Api
            {...burse}
            key={index}
          />
        )}
      </div>
    </div>
  );
}
