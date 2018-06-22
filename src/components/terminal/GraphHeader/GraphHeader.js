import * as React from 'react';

const ROOT_CLASS = 'graph-header';

export const GraphHeader = (props) => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__pair-selects`}>

      </div>
      <div className={`${ROOT_CLASS}__date-selects`}>

      </div>
    </div>
  );
}
