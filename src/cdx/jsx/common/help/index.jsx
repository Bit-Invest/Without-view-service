import React from 'react';

import Tooltip from 'react-tooltip-lite';

import './style.scss';

export default class HelpPoint extends React.Component {
  render() {
    const { description } = this.props;

    return(
      <div className="helpPoint">
        <Tooltip content={description}>
          <div className="img"></div>
        </Tooltip>
      </div>
    );
  }
}