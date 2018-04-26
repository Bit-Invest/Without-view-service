import * as React from 'react';

const ROOT_CLASS = 'registration-page';

export const RegistrationPage = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__form-column`}>
        <div className={`${ROOT_CLASS}__logo`} />
        <div className={`${ROOT_CLASS}__form`}>{props.children}</div>
        <div className={`${ROOT_CLASS}__disclaimer`}>
          © 2018 CryptoActive | <span>Privacy Policy</span> &{' '}
          <span>Terms of Service</span>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__picture-column`} />
    </div>
  );
};
