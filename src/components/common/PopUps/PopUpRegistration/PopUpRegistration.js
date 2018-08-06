import React from 'react';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';

const ROOT_CLASS = 'pop-up-registration';

export const PopUpRegistration = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__img`}></div>
      <div className={`${ROOT_CLASS}__content-block`}>
        <div className={`${ROOT_CLASS}__tittle`}>Registration</div>
        <div className={`${ROOT_CLASS}__info`}>
          Register to access the basic functions of the product. There is also a transition to the demo mode.
        </div>
        <Link to={'/registration/sign-up'} className={`${ROOT_CLASS}__link`}>
          <div className={`${ROOT_CLASS}__button`}>
            <Button theme="gradient-img" NameBtn="Join now"/>
          </div>
        </Link>
        <div className={`${ROOT_CLASS}__sign-in`}>Already have an account?{' '}
        <Link className='span' to={'/registration/sign-in'}>Sign In</Link></div>
      </div>
    </div>
  )
}
