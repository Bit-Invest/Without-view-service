import * as React from 'react';
import { PercentResult } from '@common/PercentResult';

const ROOT_CLASS = 'unit';

export const Unit = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${ROOT_CLASS}_${props.size}`;
  }

  return (
    <div className={buildRootClass()}>
      <span className={`${ROOT_CLASS}__title`}>{props.title.toUpperCase()}</span>{' '}
      <PercentResult count={props.count} size={props.size} />
    </div>
  );
}
