import React from 'react';

export const Select = props => {
  const handleSelectChange = e => {
    const { onChange } = props;

    onChange && onChange(e);
  };

  return (
    <select onChange={handleSelectChange} className="selectInput">
      <option>Trader</option>
      <option>Investor</option>
    </select>
  );
};
