import * as React from 'react';
import { Menu } from './Menu';
import PropTypes from 'prop-types';

export class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowedPopUp: false
    };
    this.currentPage = props.page;
  }

  static propTypes = {
    page: PropTypes.string,
  };

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
    console.log('SSSSSSSSSSSSS');
    this.setState({isShowedPopUp: true});
  }

  onClosePopUp() {
    this.setState({isShowedPopUp: false});
  }
}
