import * as React from 'react';
import { Menu } from './Menu'

export class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.currentPage = props.page;
  }

  render() {
    const exPage = this.currentPage;
    this.currentPage = this.props.page;
    return (
      <Menu
        page={this.props.page}
        exPage={exPage}
      />
    );
  }
}
