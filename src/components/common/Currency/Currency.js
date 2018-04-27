import * as React from 'react';

const ROOT_CLASS = 'currency';

export const Currency = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__icon`}>

      </div>
      <div className={`${ROOT_CLASS}__rate`}>
        {`\$${props.rate}`}
      </div>
      <div className={`${ROOT_CLASS}__change`}>

      </div>
    </div>
  );
}
