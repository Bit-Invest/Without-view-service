import React from 'react';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { objectLangs, lng } from '../../../../lngs/index'

const ROOT_CLASS = 'pop-up-registration';

export const PopUpRegistration = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__img`}></div>
      <div className={`${ROOT_CLASS}__content-block`}>
        <div className={`${ROOT_CLASS}__tittle`}>{ objectLangs[lng]['PopUpRegistration#1'] }</div>
        <div className={`${ROOT_CLASS}__info`}>
          { objectLangs[lng]['PopUpRegistration#2'] }
        </div>
        <Link to={'/registration/sign-up'} className={`${ROOT_CLASS}__link`}>
          <div className={`${ROOT_CLASS}__button`}>
            <Button theme="gradient-img" NameBtn={ objectLangs[lng]['PopUpRegistration#4'] }/>
          </div>
        </Link>
        <div className={`${ROOT_CLASS}__sign-in`}>{ objectLangs[lng]['PopUpRegistration#3'] }{' '}
        <Link className='span' to={'/registration/sign-in'}>{ objectLangs[lng]['PopUpRegistration#5'] }</Link></div>
      </div>
    </div>
  )
}
