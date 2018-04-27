import React from 'react';

export const Input = props => {
  const HandleEmailChange = e => {
    const { onChange } = props;

    onChange && onChange(e);
  };

  const buildRootClass = () => {
    return 'input-reg' +
      (props.needForgot ? ' input-reg_forgot' : '') +
      (props.isError ? ' input-reg_error' : '');
  };

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
  };

  const renderRequired = () => {
    if (props.required) {
      return <div className="inputEmail__required">*</div>;
    }
  };

  return (
    <div className={buildRootClass()}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={HandleEmailChange}
        className="inputEmail"
      />
      {renderRequired()}
      {renderForgot()}
    </div>
  );
};
