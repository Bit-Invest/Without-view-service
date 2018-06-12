import React from 'react';

const ROOT_CLASS = 'select';

export const Select = props => {
  const handleSelectChange = e => {
    const { onChange } = props;

    onChange && onChange(e);
  };

  const buildRootClass = () => {
    return (
      ROOT_CLASS +
      (props.theme ? ` ${ROOT_CLASS}_${props.theme}` : '')
    );
  };

  return (
    <select name={props.name} onChange={handleSelectChange} className={buildRootClass()}>
      {props.options.map((option, index) =>
          <option value={option.value} key={index}>{option.label}</option>)}
    </select>
  );
};
