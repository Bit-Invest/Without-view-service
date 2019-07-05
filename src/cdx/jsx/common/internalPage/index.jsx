import React from 'react';

import Header from '@cdx/jsx/common/header/';

import './style.scss'

export default class Page extends React.Component {
  constructor() {
    super();

    this.state = {
      ieoMessageShow: true,
    };
  }

  static defaultProps = {
    settings: {
      header: true,
    },
  }

  render() {
    const { atopClass, children, settings, reduxState } = this.props;

    return(
      <div className={`${atopClass} internalPage`}>
        {settings.header && <Header {...({reduxState})} />}
        <div className="container">
          <div className="contentChildren">
            {children}
          </div>
        </div>
      </div>
    )
  }
};
