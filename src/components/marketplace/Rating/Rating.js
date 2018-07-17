import React from 'react';

const ROOT_CLASS = 'rating';

export const Rating = props => {
  const renderStars = () => {
    let circles = [];
    for (let i = 0; i < 5; i++) {
      circles.push(
        <div
          className={`${ROOT_CLASS}__${i < props.rating ? "full-circle" : "full-empty"}`}
          key={i}
        />
      );
    }
    return circles;
  }

  const buildRootClass = () => {
    return `${ROOT_CLASS} ${props.theme ? ROOT_CLASS + '_' + props.theme : ''}`;
  }

  return (
    <div className={buildRootClass()}>
      <div className={`${ROOT_CLASS}__role`}>
        {props.role}
      </div>
      <div className={`${ROOT_CLASS}__stars`}>
        {renderStars()}
      </div>
      <div className={`${ROOT_CLASS}__votes`}>
        {`(${props.votes})`}
      </div>
    </div>
  );
};
