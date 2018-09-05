import * as React from 'react';
// import { Checkbox } from '@registration/checkbox';
// import { Select } from '@registration/select';
import { Button } from '@components/common/Button';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'kyc-step2';

export const KycStep2 = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__step-block`}>
        <div className={`${ROOT_CLASS}__circle-filled`}>1</div>
        <div className={`${ROOT_CLASS}__border`} />
        <div className={`${ROOT_CLASS}__circle`}>2</div>
        <div className={`${ROOT_CLASS}__border`} />
        <div className={`${ROOT_CLASS}__circle`}>3</div>
      </div>
      <div className={`${ROOT_CLASS}__circle-text-block`}>
        <div className={`${ROOT_CLASS}__circle-text-filled`}>
          { objectLangs[lng]['KycStep2#1'] }
        </div>
        <div className={`${ROOT_CLASS}__circle-text`}>
          { objectLangs[lng]['KycStep2#2'] }
        </div>
        <div className={`${ROOT_CLASS}__circle-text`}>
          { objectLangs[lng]['KycStep2#3'] }
        </div>
      </div>
      <div className={`${ROOT_CLASS}__info`}>
        { objectLangs[lng]['KycStep2#4'] }
      </div>
      <Button theme="gradient-img" NameBtn={ objectLangs[lng]['KycStep2#1'] } />
      <div className={`${ROOT_CLASS}__href`}>{ objectLangs[lng]['KycStep2#5'] }</div>
    </div>
  );
};
