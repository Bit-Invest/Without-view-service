import React from 'react';

const ROOT_CLASS = 'rating';

export const Rating = props => {
  // const RetingResult = () => {
  //   { props.rating }
  // }

  const renderRating = () => {
    let circles = [];
    for (let i = 0; i < 10; i++) {
      circles.push(
        <div
          className={`${ROOT_CLASS}__${i < props.rating ? "full-circle" : "full-empty"}`}
          key={i}
        />
      );
    }
    return circles;
  }

  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__label`}>Rating: &nbsp;</div>
        {renderRating()}
    </div>
  );
};
