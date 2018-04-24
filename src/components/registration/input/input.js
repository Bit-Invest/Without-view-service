import React from 'react';
import './input.css';

export const Input = props => {
  const HandleEmailChange = e => {
    const { onChange } = props;

    onChange && onChange(e);
  };

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={HandleEmailChange}
      className="inputEmail"
    />
  );
};
