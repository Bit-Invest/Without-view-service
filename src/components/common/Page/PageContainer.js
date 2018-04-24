import * as React from 'react';
import { Page } from './Page'

export class PageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopUpOpened: false
    }
  }

  render() {
    return (
      <Page isPopUpOpened={this.state.isPopUpOpened}>
        {this.props.children}
      </Page>
    );
  }
}
