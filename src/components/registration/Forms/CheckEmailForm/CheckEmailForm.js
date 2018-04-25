import React from 'react';
import './CheckEmailForm.css';

export const CheckEmailForm = props => {
  console.log(props)
  return (
    <form
      className="Check-email__RegistrationForm"
    >
      <div className="title">Please, check your email</div>
      <div className="success">
        We have sent you instructions to reset your password.
      </div>
      <div className="transitionAccount">
        Return to <span onClick={props.onClickSignIn}>Sign In</span>
      </div>
    </form>
  );
};
