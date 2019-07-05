import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const BlackoutBlock = (props) => (
  <div className={`${props.atopClass} blackoutBlock`}>
    {props.children}
  </div>
);

export default BlackoutBlock;
