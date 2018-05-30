import React from 'react';
import { Button } from '@components/common/Button';
import { Select } from '@registration/select';
import { Input } from '@registration/input';
import { TextArea } from '@registration/TextArea';

const ROOT_CLASS = 'pop-up-new-product';

export const PopUpNewProduct = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__tittle`}>New Product</div>
      <Select
        onChange={this.handleSelectChange}
        NameSelect1="Choose your stock exchange"
        NameSelect2='option2'
        theme="new-product"
      />
    {/*<Select
        onChange={this.handleSelectChange}
        NameSelect1="Currency pair"
        NameSelect2='option2'
        theme="new-product"
      />*/}
      <Input
        onChange={this.handleEmailChange}
        placeholder="API Key"
        type="text"
        theme="input-new-product"
        required
      />
      <Input
        onChange={this.handleEmailChange}
        placeholder="secret key"
        type="text"
        theme="input-new-product"
        required
      />
    {/*<TextArea
        placeholder='Description of your strategy min 500 characters'
      />*/}
      <Button
        className={`${ROOT_CLASS}__button`}
        theme="pop-up-new-product"
        NameBtn="Add Product"
      />
      <div className={`${ROOT_CLASS}__key`}>
        Where to get API Key?
      </div>
    </div>
  );
};
