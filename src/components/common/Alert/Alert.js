import * as React from 'react';

const ROOT_CLASS = 'alert';

const TypeToFill = {
  error: '#FF4040',
  attention: '#FFB300',
  info: '#00B2FF'
};

export const Alert = (props) => (
  <div className={ROOT_CLASS}>
    <div
      className=
        {`${ROOT_CLASS}__undercover ${ROOT_CLASS}__undercover_${props.type}`}
    ></div>
    <div className={`${ROOT_CLASS}__content`}>
      <div className={`${ROOT_CLASS}__info`}>
        <div
          className=
            {`${ROOT_CLASS}__icon ${ROOT_CLASS}__icon_${props.iconType}`}
        >
        </div>
        <div className={`${ROOT_CLASS}__description`}>{props.description}</div>
      </div>
    </div>
    <div
      className={`${ROOT_CLASS}__close`}
      onClick={() => {props.removeAlert(props.id)}}
    >
      <div className={`${ROOT_CLASS}__check`}></div>
    </div>
  </div>
);
