import React from 'react';
import './input.css';

export const Input = props => {
  const HandleEmailChange = e => {
    const { onChange } = props;

    onChange && onChange(e);
  };

  return (
    <input
      type="text"
      placeholder="Your email"
      onChange={HandleEmailChange}
      className="inputEmail"
    />
  );
};
