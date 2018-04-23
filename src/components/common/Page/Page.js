import * as React from 'react';

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      {this.renderContent()}
    );
  }

  renderContent() {
    return null;
  }
}
