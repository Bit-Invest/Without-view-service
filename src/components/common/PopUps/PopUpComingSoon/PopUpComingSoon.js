import * as React from 'react';
import { objectLangs, lng } from '../../../../lngs/index'

const ROOT_CLASS = 'pop-up-coming-soon';

export const PopUpComingSoon = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__img`}></div>
      <div className={`${ROOT_CLASS}__caption`}>{ objectLangs[lng]['PopUpComingSoon#1'] }</div>
      <div className={`${ROOT_CLASS}__info`}>{ objectLangs[lng]['PopUpComingSoon#2'] }</div>
    </div>
  )
}
