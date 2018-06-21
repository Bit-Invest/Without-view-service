import React from 'react';

const ROOT_CLASS = 'select';

export const Select = props => {

  const buildRootClass = () => {
    return (
      ROOT_CLASS +
      (props.theme ? ` ${ROOT_CLASS}_${props.theme}` : '')
    );
  };

  return (
    <div
      name={props.name}
      onClick={props.handleSelectChange}
      className={buildRootClass()}
    >
      <div>{props.currentValue}</div>
        <div className={`${ROOT_CLASS} ${props.isOpenend ? '' : ROOT_CLASS + '_closed'}`}>
            {props.options.map((option, index) : null =>
            <div value={option.value} key={index}>{option.label}</div>)}
        </div>
    </div>
  );
};
