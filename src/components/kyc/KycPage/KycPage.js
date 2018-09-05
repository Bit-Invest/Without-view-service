import * as React from 'react';
// import { KycStep1 } from '@components/kyc/KycStep1';
import { KycStep2 } from '@components/kyc/KycStep2';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'kyc-page';

export const KycPage = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__left-block`}>
        <div className={`${ROOT_CLASS}__logo`}></div>
        <div className={`${ROOT_CLASS}__tittle`}>
          { objectLangs[lng]['KycPage#1'] }
        </div>
          {/*<KycStep1 />*/}
          <KycStep2 />
        <div className={`${ROOT_CLASS}__footer`}>
          { objectLangs[lng]['KycPage#2'] } | { objectLangs[lng]['KycPage#3'] } & { objectLangs[lng]['KycPage#4'] }
        </div>
      </div>
      <div className={`${ROOT_CLASS}__right-block`}></div>
    </div>
  );
};
