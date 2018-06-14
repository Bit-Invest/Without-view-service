import * as React from 'react';
import { ProfilePage } from './ProfilePage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPersonalInfo, getKeys } from '@store/modules/user';
import { push } from 'react-router-redux';
import { showPopUp } from '@store/modules/common';
import { testSubscribe, openingPosition } from '@store/modules/terminal';

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentWillMount() {
    Promise.all([
      this.props.getPersonalInfo(),
      this.props.getKeys()
    ]).then(this.onLoadPersonalInfo.bind(this))
      .catch(this.onFailPersonalInfo.bind(this));
  }

  onFailPersonalInfo(err) {
    this.props.push('/registration/sign-in');
  }

  onLoadPersonalInfo() {
    this.setState({isLoaded: true});
  }

  onClickAddProduct() {
    this.props.showPopUp('newProduct');
  }

  onClosePopUp() {
    this.setState({isShowedPopUpNewProduct: false});
  }

  render() {
    const { onClickAddProduct, onClosePopUp } = this;

    return this.state.isLoaded ? (
      <ProfilePage
        isLoaded={this.state.isLoaded}
        isShowedPopUpNewProduct={this.state.isShowedPopUpNewProduct}
        onClickAddProduct={onClickAddProduct.bind(this)}
        onClosePopUp={onClosePopUp.bind(this)}
        user={this.props.user}
      />
    ) : null;
  }
}

const mapStateToProps = (state) => {return {user: state.user}};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPersonalInfo,
    getKeys,
    push,
    showPopUp,
    openingPosition,
    testSubscribe
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);

export {connectedContainer as ProfilePageContainer};
