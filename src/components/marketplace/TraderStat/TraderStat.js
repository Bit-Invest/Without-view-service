import * as React from 'react';

const ROOT_CLASS = 'trader-stat';

export const TraderStat = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <span className={`${ROOT_CLASS}__name`}>{props.name}</span>
      <span className={`${ROOT_CLASS}__spaces`}>{'   '}</span>
      <span className={`${ROOT_CLASS}__stat`}>{props.value}</span>
    </div>
  );
}
