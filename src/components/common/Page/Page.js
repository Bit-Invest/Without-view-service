import * as React from 'react';

const ROOT_CLASS = 'page';

export const Page = (props) => {
  return (
    <div className={ROOT_CLASS}>
      {props.children}
    </div>
  );
}
