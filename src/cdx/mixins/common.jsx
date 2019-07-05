import React from 'react';
import configs from '@cdx/configs/';

export const dataNoLoaded = (data) => {
  let tsData = data;

  const isLoading = tsData.some(curData => 
    curData === configs.common.TYPES_RESULT['LOADING']
  );

  const isError = tsData.some(curData => 
    curData === configs.common.TYPES_RESULT['ERROR']
  );

  if (isError) {
    return [
      configs.common.TYPES_RESULT['ERROR'],
      <div>ERROR REQUEST</div>,
    ];
  }

  if (isLoading) {
    return [
      configs.common.TYPES_RESULT['LOADING'],
      <div>Loading...</div>,
    ];
  }

  return [
    configs.common.TYPES_RESULT['SUCESS'],
    false,
  ];
};

export default ({
  dataNoLoaded,
});
