import * as React from 'react';
import { Menu } from './Menu';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowedPopUpDev: false,
      isShowedPopUpRegistration: false
    };
    this.currentPage = props.page;
  }

  static propTypes = {
    page: PropTypes.string,
  };

  render() {
    this.currentPage = this.props.page;
    return (
      <Menu
        push={this.props.push}
        page={this.props.page}
        user={this.props.user}
        onClickRegItem={this.onClickRegItem.bind(this)}
        onClickInDev={this.onClickInDev.bind(this)}
        onCloseDevPopUp={this.onCloseDevPopUp.bind(this)}
        onClosePopUpRegistration={this.onClosePopUpRegistration.bind(this)}
        isShowedPopUpDev={this.state.isShowedPopUpDev}
        isShowedPopUpRegistration={this.state.isShowedPopUpRegistration}
      />
    );
  }

  onClickRegItem() {
    this.setState({isShowedPopUpRegistration: true});
  }

  onClosePopUpRegistration() {
    this.setState({isShowedPopUpRegistration: false});
  }

  onClickInDev() {
    this.setState({isShowedPopUpDev: true});
  }

  onCloseDevPopUp() {
    this.setState({isShowedPopUpDev: false});
  }
}

const mapStateToProps = (state) => {
  return {user: state.user};
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({push}, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(MenuContainer);

export {connectedContainer as MenuContainer};
