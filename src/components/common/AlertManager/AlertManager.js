import * as React from 'react';
import { Alert } from '@common/Alert';

const ROOT_CLASS = 'alert-manager';

export const AlertManager = (props) => (
  <div className={ROOT_CLASS}>
    {props.alerts.map(
      (alert, index) => <Alert {...alert} key={index} />)}
  </div>
)
