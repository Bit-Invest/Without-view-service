import * as React from 'react';
import { ProfilePage } from './ProfilePage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getPersonalInfo,
  getKeys,
  userLogIn,
  userLogOut
} from '@store/modules/user';
import { push } from 'react-router-redux';
import { showPopUp, checkJWT } from '@store/modules/common';
import { LocalStorage } from '@common/Utils';
import { getProducts } from '@store/modules/marketplace';

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentWillMount() {
    const token = LocalStorage.getItem('token');
    if (token) {
      this.props.checkJWT()
        .then(this.loadProfileInfo.bind(this))
        .catch(this.onFailJwt.bind(this));
    } else {
      this.onFailJwt();
    }
  }

  onFailJwt() {
    this.props.push('/marketplace');
  }

  loadProfileInfo() {
    this.props.userLogIn();
    Promise.all([
      this.props.getPersonalInfo(),
      this.props.getKeys(),
      this.props.getProducts()
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

  render() {
    const { onClickAddProduct } = this;
    return (
      <ProfilePage
        isLoaded={this.state.isLoaded}
        isShowedPopUpNewProduct={this.state.isShowedPopUpNewProduct}
        onClickAddProduct={onClickAddProduct.bind(this)}
        user={this.props.user}
        push={this.props.push}
        userLogOut={this.props.userLogOut}
        products={this.props.products}
        investors={[
          {
            name: "Ivan",
            surname: "Ivanov",
            role: "investor"
          },
          {
            name: "Oleg",
            surname: "Olegov",
            role: "investor"
          },
          {
            name: "George",
            surname: "Kozlov",
            role: "investor"
          }
        ]}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    products: state.marketplace.products
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPersonalInfo,
    getKeys,
    push,
    showPopUp,
    checkJWT,
    userLogIn,
    userLogOut,
    getProducts
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);

export {connectedContainer as ProfilePageContainer};
