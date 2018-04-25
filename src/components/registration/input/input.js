import React from 'react';
import './input.css';

export const Input = props => {
  const HandleEmailChange = e => {
    const { onChange } = props;

    onChange && onChange(e);
  };

  const buildRootClass = () => {
    return 'input-reg' + (props.needForgot ? ' input-reg_forgot' : '');
  }

  const renderForgot = () => {
    let result = null;
    if (props.needForgot) {
      return (
        <div className="inputEmail__forgot" onClick={props.onClickForgot}>
          Forgot?
        </div>
      );
    }
    return result;
  }

  return (
    <div className={buildRootClass()}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={HandleEmailChange}
        className="inputEmail"
      />
      {renderForgot()}
    </div>
  );
};
