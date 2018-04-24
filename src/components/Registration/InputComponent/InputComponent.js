import React from 'react';
import './InputComponent.css';

export const InputComponent = props => {
  const HandleEmailChange = e => {
    const { onChange } = props;

    onChange && onChange(e);
  };

  return (
    <input
      type={this.props.type}
      placeholder="Your email"
      onChange={HandleEmailChange}
      className="inputEmail"
    />
  );
};
