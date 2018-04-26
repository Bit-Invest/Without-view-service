import React from 'react';

export const CheckEmailForm = props => {
  return (
    <form className="Check-email__RegistrationForm">
      <div className="title">Please, check your email</div>
      <div className="success">
        We have sent you instructions to reset your password.
      </div>
      <div className="success-img" alt="" />
      <div className="transitionAccount">
        Return to <span onClick={props.onClickSignIn}>Sign In</span>
      </div>
    </form>
  );
};
