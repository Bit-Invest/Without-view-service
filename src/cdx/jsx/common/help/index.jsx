import React from 'react';

import Tooltip from 'react-tooltip-lite';

import './style.scss';

export default class HelpPoint extends React.Component {
  render() {
    const { description } = this.props;

    return(
      <div className="helpPoint">
        {this.props.children}
        <Tooltip content={description} className="helpPointChild">
          <div className="img"></div>
        </Tooltip>
      </div>
    );
  }
}