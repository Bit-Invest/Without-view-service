import * as React from 'react';
import { AddProduct } from '@profile/AddProduct';
import { Api } from '@profile/Api';

const ROOT_CLASS = 'apis';

export const Apis = (props) => {
  const renderList = () => {
    return props.keys && props.keys.length > 0 ?
      (
        props.keys.map((burse, index) =>
          <Api
            {...burse}
            key={index}
          />
        )
      ) : (<div className={`${ROOT_CLASS}__placeholder`}>You need to add new API Keys</div>);
  }

  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__head`}>
        <div className={`${ROOT_CLASS}__title`}>
          CURRENT FUND’S API
        </div>
        <AddProduct />
      </div>
      <div className={`${ROOT_CLASS}__list`}>
        {renderList()}
      </div>
    </div>
  );
}
