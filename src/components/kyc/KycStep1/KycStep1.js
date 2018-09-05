import * as React from 'react';
import { Checkbox } from '@registration/checkbox';
import { Select } from '@registration/select';
import { Button } from '@components/common/Button';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'kyc-step1';

export const KycStep1 = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__checkbox-block`}>
        <Checkbox
          checked={props.checked}
          onChange={props.handleCheckboxChange}
        />
        <div className={`${ROOT_CLASS}__checkbox-info`}>
          { objectLangs[lng]['KycStep1#1'] }
        </div>
      </div>
      <div className={`${ROOT_CLASS}__checkbox-block`}>
        <Checkbox
          checked={props.checked}
          onChange={props.handleCheckboxChange}
        />
        <div className={`${ROOT_CLASS}__checkbox-info`}>
          { objectLangs[lng]['KycStep1#2'] }<span className={`${ROOT_CLASS}__span`}>{ objectLangs[lng]['KycStep1#3'] }</span>.
        </div>
      </div>
      <Select
        onChange={this.handleSelectChange}
        NameSelect1={ objectLangs[lng]['KycStep1#5'] }
      />
      <Button theme="gradient-img" NameBtn="Proceed" />
      <div className={`${ROOT_CLASS}__href`}>{ objectLangs[lng]['KycStep1#4'] }</div>
    </div>
  );
};
