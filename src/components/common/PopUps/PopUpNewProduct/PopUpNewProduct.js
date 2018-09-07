import React from 'react';
import { Button } from '@components/common/Button';
import { Select } from '@registration/select';
import { Input } from '@common/Input';
import { TextArea } from '@common/TextArea';
import { objectLangs, lng } from '../../../../lngs/index'

const ROOT_CLASS = 'pop-up-new-product';

export const PopUpNewProduct = (props) => {
  return (
    <form className={ROOT_CLASS} onSubmit={props.handleSubmit}>
      <div className={`${ROOT_CLASS}__title`}>{ objectLangs[lng]['PopUpNewProduct#1'] }</div>
      <div className={`${ROOT_CLASS}__error ${!props.isError ? ROOT_CLASS + '__error_hidden' : ''}`}>
        {props.errorMessage}
      </div>
      <div className={`${ROOT_CLASS}__select-wrap`}>
        <Select
          onChange={props.handleSelectChange}
          defaultOption={{value: 'binance', label: 'Binance'}}
          options={[
            {value: 'binance', label: 'Binance'},
            {value: 'abucoins', label: 'Abucoins', visibled: true},
            {value: 'bitfinex', label: 'Bitfinex', visibled: true},
            {value: 'bitthumb', label: 'Bitthumb', visibled: true},
            {value: 'bitstamp', label: 'Bitstamp', visibled: true},
            {value: 'bittrex', label: 'Bittrex', visibled: true},
            {value: 'bleutrade', label: 'Bleutrade', visibled: true},
            {value: 'cryptopia', label: 'Cryptopia', visibled: true},
            {value: 'gdax', label: 'Gdax', visibled: true},
            {value: 'gemini', label: 'Gemini', visibled: true},
            {value: 'hitBTC', label: 'HitBTC', visibled: true},
            {value: 'huobi', label: 'Huobi', visibled: true},
            {value: 'kraken', label: 'Kraken', visibled: true},
            {value: 'kuCoin', label: 'KuCoin', visibled: true},
            {value: 'livecoin', label: 'Livecoin', visibled: true},
            {value: 'okex', label: 'Okex', visibled: true},
            {value: 'poloniex', label: 'Poloniex', visibled: true},
            {value: 'bitmex', label: 'Bitmex', visibled: true},
            {value: 'exmo', label: 'Exmo', visibled: true},
          ]}
          theme="sign-up"
        />
      </div>
      <div className={`${ROOT_CLASS}__input-wrap ${ROOT_CLASS}__input-wrap_name`}>
        <Input
          onChange={props.handleNameChange}
          placeholder={ objectLangs[lng]['PopUpNewProduct#3'] }
          type="text"
          required
        />
      </div>
      <div className={`${ROOT_CLASS}__input-wrap ${ROOT_CLASS}__input-wrap_api`}>
        <Input
          onChange={props.handleAPIChange}
          placeholder={ objectLangs[lng]['PopUpNewProduct#4'] }
          type="text"
          required
        />
      </div>
      <div className={`${ROOT_CLASS}__input-wrap ${ROOT_CLASS}__input-wrap_secret`}>
        <Input
          onChange={props.handleSecretKeyChange}
          placeholder={ objectLangs[lng]['PopUpNewProduct#5'] }
          type="text"
          required
        />
      </div>
      <div className={`${ROOT_CLASS}__textarea ${props.role !== 'trader' ? ROOT_CLASS + '__textarea_hidden' : ''}`}>
        <TextArea
          onChange={props.handleAreaChange}
          areaProps={{
            placeholder: objectLangs[lng]['PopUpNewProduct#6']
          }}
        />
      </div>
      <div className={`${ROOT_CLASS}__footer`}>
        <div className={`${ROOT_CLASS}__button-wrap`}>
          <Button
            className={`${ROOT_CLASS}__button`}
            theme="gradient-img"
            NameBtn={ objectLangs[lng]['PopUpNewProduct#7'] }
          />
        </div>
        <div className={`${ROOT_CLASS}__key`}>
          { objectLangs[lng]['PopUpNewProduct#2'] }
        </div>
      </div>
    </form>
  );
};
