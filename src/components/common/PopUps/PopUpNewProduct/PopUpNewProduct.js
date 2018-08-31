import React from 'react';
import { Button } from '@components/common/Button';
import { Select } from '@registration/select';
import { Input } from '@common/Input';
import { TextArea } from '@common/TextArea';

const ROOT_CLASS = 'pop-up-new-product';

export const PopUpNewProduct = (props) => {
  return (
    <form className={ROOT_CLASS} onSubmit={props.handleSubmit}>
      <div className={`${ROOT_CLASS}__title`}>NEW PRODUCT</div>
      <div className={`${ROOT_CLASS}__error ${!props.isError ? ROOT_CLASS + '__error_hidden' : ''}`}>
        {props.errorMessage}
      </div>
      <div className={`${ROOT_CLASS}__select-wrap`}>
        <Select
          onChange={props.handleSelectChange}
          defaultOption={{value: 'binance', label: 'Binance'}}
          options={[
            {value: 'binance', label: 'Binance'}
          ]}
          theme="sign-up"
        />
      </div>
      <div className={`${ROOT_CLASS}__input-wrap ${ROOT_CLASS}__input-wrap_name`}>
        <Input
          onChange={props.handleNameChange}
          placeholder="Name of product (50 characters maximum)"
          type="text"
          required
        />
      </div>
      <div className={`${ROOT_CLASS}__input-wrap ${ROOT_CLASS}__input-wrap_api`}>
        <Input
          onChange={props.handleAPIChange}
          placeholder="API Key"
          type="text"
          required
        />
      </div>
      <div className={`${ROOT_CLASS}__input-wrap ${ROOT_CLASS}__input-wrap_secret`}>
        <Input
          onChange={props.handleSecretKeyChange}
          placeholder="secret key"
          type="text"
          required
        />
      </div>
      <div className={`${ROOT_CLASS}__textarea ${props.role !== 'trader' ? ROOT_CLASS + '__textarea_hidden' : ''}`}>
        <TextArea
          onChange={props.handleAreaChange}
          areaProps={{
            placeholder: 'Description of your strategy min 250 characters'
          }}
        />
      </div>
      <div className={`${ROOT_CLASS}__footer`}>
        <div className={`${ROOT_CLASS}__button-wrap`}>
          <Button
            className={`${ROOT_CLASS}__button`}
            theme="gradient-img"
            NameBtn="Add Product"
          />
        </div>
        <div className={`${ROOT_CLASS}__key`}>
          Where to get API Key?
        </div>
      </div>
    </form>
  );
};
