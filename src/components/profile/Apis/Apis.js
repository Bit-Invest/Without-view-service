import * as React from 'react';
import { AddProduct } from '@profile/AddProduct';
import { Api } from '@profile/Api';
import { objectLangs, lng } from '../../../lngs/index'

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
      ) : (<div className={`${ROOT_CLASS}__placeholder`}>{ objectLangs[lng]['Apis#1'] }</div>);
  }

  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__head`}>
        <div className={`${ROOT_CLASS}__title`}>
          { objectLangs[lng]['Apis#2'] }
        </div>
        {/* <button id="signupButton" className="civic-button-a medium" type="button">
          <span>Connect with Civic</span>
        </button> */}
        <AddProduct />
      </div>
      <div className={`${ROOT_CLASS}__list`}>
        {renderList()}
      </div>
    </div>
  );
}
