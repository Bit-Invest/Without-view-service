import * as React from 'react';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'order-timer';

export const OrderTimer = (props) => (
  <div className={ROOT_CLASS}>
    <span className={`${ROOT_CLASS}__weeks`}>{props.weeks}{ objectLangs[lng]['OrderTimer#1'] } </span>
    <span className={`${ROOT_CLASS}__days`}>{props.days}{ objectLangs[lng]['OrderTimer#2'] } </span>
    <span className={`${ROOT_CLASS}__hours`}>{props.hours}{ objectLangs[lng]['OrderTimer#3'] } </span>
    <span className={`${ROOT_CLASS}__minutes`}>{props.minutes}{ objectLangs[lng]['OrderTimer#4'] } </span>
    <span className={`${ROOT_CLASS}__seconds`}>{props.seconds}{ objectLangs[lng]['OrderTimer#5'] }</span>
  </div>
);
