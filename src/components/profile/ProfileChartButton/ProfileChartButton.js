import * as React from 'react';

const ROOT_CLASS = 'profile-chart-button';

export const ProfileChartButton = (props) => {
  const buildRootClass = () => {
    return `${ROOT_CLASS} ${props.isActive ? ROOT_CLASS + '_active' : ''}`;
  }
  return (
    <div
      className={buildRootClass()}
      onClick={() => {props.onClick(props.title, props.id)}}
    >
      <div className={`${ROOT_CLASS}__title`}>
        {props.title}
      </div>
    </div>
  );
}
