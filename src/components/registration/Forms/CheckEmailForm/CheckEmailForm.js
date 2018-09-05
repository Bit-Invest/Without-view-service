import React from 'react';
import { Link } from 'react-router-dom';
import { objectLangs, lng } from '../../../../lngs/index'

export const CheckEmailForm = props => {
  return (
    <form className="Check-email__RegistrationForm">
      <div className="title">{ objectLangs[lng]['CheckEmailForm#1'] }</div>
      <div className="success">
        { objectLangs[lng]['CheckEmailForm#2'] }
      </div>
      <div className="success-img" alt="" />
      <div className="transitionAccount">
        { objectLangs[lng]['CheckEmailForm#3'] } <Link to="/registration/sign-in"><span>{ objectLangs[lng]['CheckEmailForm#4'] }</span></Link>
      </div>
    </form>
  );
};
