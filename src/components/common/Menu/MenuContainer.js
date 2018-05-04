import * as React from 'react';
import { Menu } from './Menu'

export class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowedPopUp: false
    };
    this.currentPage = props.page;
  }

  render() {
    const exPage = this.currentPage;
    this.currentPage = this.props.page;
    return (
      <Menu
        page={this.props.page}
        exPage={exPage}
        onClickInDev={this.onClickInDev.bind(this)}
        onClosePopUp={this.onClosePopUp.bind(this)}
        isShowedPopUp={this.state.isShowedPopUp}
      />
    );
  }

  onClickInDev() {
    this.setState({isShowedPopUp: true});
  }

  onClosePopUp() {
    this.setState({isShowedPopUp: false});
  }
}
