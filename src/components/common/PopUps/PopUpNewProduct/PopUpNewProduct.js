import React from 'react';
import { Button } from '@components/common/Button';
import { Select } from '@registration/select';
import { Input } from '@registration/input';

const ROOT_CLASS = 'pop-up-new-product';

export const PopUpNewProduct = (props) => {
  return (
    <form className={ROOT_CLASS} onSubmit={props.handleSubmit}>
      <div className={`${ROOT_CLASS}__tittle`}>New Product</div>
      <Select
        onChange={props.handleSelectChange}
        NameSelect1="Choose your stock exchange"
        NameSelect2='option2'
        theme="new-product"
      />
      <Input
        onChange={props.handleAPIChange}
        placeholder="API Key"
        type="text"
        theme="input-new-product"
        required
      />
      <Input
        onChange={props.handleSecretKeyChange}
        placeholder="secret key"
        type="text"
        theme="input-new-product"
        required
      />
      <Button
        className={`${ROOT_CLASS}__button`}
        theme="pop-up-new-product"
        NameBtn="Add Product"
      />
      <div className={`${ROOT_CLASS}__key`}>
        Where to get API Key?
      </div>
    </form>
  );
};
