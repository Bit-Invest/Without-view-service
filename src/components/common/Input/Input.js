import * as React from 'react';

const ROOT_CLASS = 'input';

const rootClass = (props) => {
  return `${ROOT_CLASS} ${props.theme ? ROOT_CLASS + '_' + props.theme : ''}`;
}

const renderTip = (props) => {
  props.tip ?
    return (<div className={`${ROOT_CLASS}__tip`}>{props.tip}</div>) :
    return null;
}

const renderStar = (props) => {
  props.required ?
    return (<div className={`${ROOT_CLASS}__star`}>*</div>) :
    return null;
}

export const Input = (props) => (
  <div className={rootClass(props)}>
    <input className={`${ROOT_CLASS}__input`} />
    {renderTip(props)}
    {renderStar(props)}
  </div>
)
