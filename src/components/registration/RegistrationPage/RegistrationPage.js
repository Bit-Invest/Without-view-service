import * as React from 'react';
import './RegistrationPage.css';

const ROOT_CLASS = 'registration-page';

export const RegistrationPage = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__form-column`}>
        <div className={`${ROOT_CLASS}__logo`}></div>
        <div className={`${ROOT_CLASS}__form`}>
          {props.children}
        </div>
        <div className={`${ROOT_CLASS}__disclaimer`}>
          © 2018 CryptoActive | Privacy Policy & Terms of Service
        </div>
      </div>
      <div className={`${ROOT_CLASS}__picture-column`}></div>
    </div>
  );
}
