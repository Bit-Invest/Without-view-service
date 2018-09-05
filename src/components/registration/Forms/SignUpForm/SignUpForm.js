import React from 'react';
import { Select } from '@registration/select';
// import { Input } from '@registration/input';
import { Input } from '@common/Input';
import { Checkbox } from '@registration/checkbox';
import { Button } from '@components/common/Button';
import { Link } from 'react-router-dom';
import { objectLangs, lng } from '../../../../lngs/index'

export const SignUpForm = props => {
  const { isError } = props;

  return (
    <form
      className="SignUpForms__RegistrationForm"
      onSubmit={props.handleSubmit}>
      <div className="title">{ objectLangs[lng]['SignUpForm#1'] }</div>
      <div className='SignUpForms__RegistrationForm__error-block'>
        {props.errorMessage}
      </div>
      <div className="SignUpForms__select-wrap">
        <Select
          onChange={props.handleEnter}
          name="select"
          theme="sign-up"
          defaultOption={{
            value: 'trader',
            label: 'Trader'
          }}
          options={[
            {
              value: 'trader',
              label: 'Trader'
            },
            {
              value: 'investor',
              label: 'Investor'
            }
          ]}
        />
      </div>
      <div className={`SignUpForms__input-wrap`}>
        <Input
          onChange={props.handleEnter}
          placeholder={ objectLangs[lng]['SignUpForm#2'] }
          type="text"
          required
          isError={props.isErrorName}
          name="name"
        />
      </div>
      <div className={`SignUpForms__input-wrap`}>
        <Input
          onChange={props.handleEnter}
          placeholder={ objectLangs[lng]['SignUpForm#3'] }
          type="text"
          required
          isError={props.isErrorSurName}
          name="surname"
        />
      </div>
      <div className={`SignUpForms__input-wrap`}>
        <Input
          onChange={props.handleEnter}
          placeholder={ objectLangs[lng]['SignUpForm#4'] }
          type="text"
          required
          isError={props.isErrorEmail}
          name="email"
        />
      </div>
      <div className={`SignUpForms__input-wrap`}>
        <Input
          onChange={props.handleEnter}
          placeholder={ objectLangs[lng]['SignUpForm#5'] }
          type="password"
          required
          isError={props.isErrorPasword}
          name="password"
        />
      </div>
      <div className="checkboxBlock"
        onClick={props.handleCheckbox}>
        <Checkbox
          checked={props.checked}
          onChange={props.handleCheckbox}
          isError={isError}
        />
        <div>
          { objectLangs[lng]['SignUpForm#6'] }
          <div className="required">{ objectLangs[lng]['SignUpForm#7'] }</div>
        </div>
      </div>
      <div className={`button-wrap`}>
        <Button theme="gradient-img" NameBtn="Sign Up" preloader={props.preloader} />
      </div>
      <div className="transitionAccount">
      { objectLangs[lng]['SignUpForm#8'] }{' '}
        <Link className='span' to={'/registration/sign-in'}>{ objectLangs[lng]['SignUpForm#9'] }</Link>
      </div>
    </form>
  );
};
