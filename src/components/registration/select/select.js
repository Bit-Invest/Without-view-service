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

  const NameSelect = () => {
    return  props.NameSelect1 ? ` ${props.NameSelect1}` : '' || props.NameSelect2 ? ` ${props.NameSelect2}` : '';
  };

  return (
    <select onChange={handleSelectChange} className={buildRootClass()}>
      <option>{NameSelect()}</option>
      <option>{NameSelect()}</option>
    </select>
  );
};
