import * as React from 'react';
import { ProfilePage } from './ProfilePage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getPersonalInfo,
  getKeys,
  userLogIn,
  userLogOut,
  getMyProducts,
  getMyInvestors
} from '@store/modules/user';
import { push } from 'react-router-redux';
import { showPopUp, checkJWT } from '@store/modules/common';
import { LocalStorage } from '@common/Utils';
import { getProducts } from '@store/modules/marketplace';
import { objectLangs, lng } from '../../../lngs/index'
import Tour from 'reactour';
import { sendKYC } from '@store/modules/user';

const tourConfig = [
  {
    selector: '.balance__base',
    content: objectLangs[lng]['ProfilePageContainer#1'],
    accentColor: '#f2f2f2'
  },
  {
    selector: '.stock-area-chart',
    content: objectLangs[lng]['ProfilePageContainer#2'],
  },
  //   selector: '.trader-history__caption',
  //   content: objectLangs[lng]['ProfilePageContainer#3'],
  // },
  // {
  //   selector: '.terminal-graph',
  //   content: objectLangs[lng]['ProfilePageContainer#4'],
  // },
  // {
  //   selector: '.tabs__button:nth-of-type(1)',
  //   content: objectLangs[lng]['ProfilePageContainer#5'],
  // },
  {
    selector: '.api__status',
    content: objectLangs[lng]['ProfilePageContainer#6'],
  }, 
];

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isTourOpen: false,
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
      this.props.getMyProducts(),
      this.props.getMyInvestors()
    ]).then(this.onLoadPersonalInfo.bind(this))
      .catch(this.onFailPersonalInfo.bind(this));
  }

  onFailPersonalInfo(err) {
    this.props.push('/registration/sign-in');
  }

  onLoadPersonalInfo(res) {
    this.setState({ isLoaded: true });
    this.openTour()
  }

  signupClick = () => {
    const civicSip = new window.civic.sip({ appId: 'uoljp-vyU' })
  
    civicSip.signup({
      style: 'popup',
      scopeRequest: civicSip.ScopeRequests.PROOF_OF_IDENTITY
    })

    civicSip.on('auth-code-received', (event) => {
      const jwtToken = event.response

      this.setState({ isLoaded: false });
      
      this.props.sendKYC(jwtToken)
        .then(res => {
          if (res.payload.status === 200) {
            this.props.getPersonalInfo()
              .then(() => {
                this.setState({ isLoaded: true });
              })
          } else {
            console.log('res error', res)
          }
        })
        .catch(err => {
          console.log('error', err)
        })
    })
  }

  onClickAddProduct() {
    this.props.showPopUp('newProduct');
  }

  closeTour = () => {
    this.setState({ isTourOpen: false })
  }

  openTour = () => {
    setTimeout(() => {
      this.setState({ isTourOpen: true })
    }, 500)
  }

  render() {
    const { onClickAddProduct } = this;
    const accentColor = '#5cb7b7';

    return (
      <div>
        <Tour
          onRequestClose={this.closeTour}
          steps={tourConfig}
          isOpen={this.state.isTourOpen}
          maskClassName="mask"
          className="helper"
          rounded={tourConfig.length}
          accentColor={accentColor}
        />
        <ProfilePage
          isLoaded={this.state.isLoaded}
          isShowedPopUpNewProduct={this.state.isShowedPopUpNewProduct}
          onClickAddProduct={onClickAddProduct.bind(this)}
          user={this.props.user}
          signupClick={this.signupClick}
          push={this.props.push}
          userLogOut={this.props.userLogOut}
          products={this.props.user.myProducts}
          keys={this.props.user.burses}
          investors={this.props.user.investors}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
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
    getProducts,
    getMyProducts,
    getMyInvestors,
    sendKYC
  }, dispatch);

const connectedContainer =
  connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);

export {connectedContainer as ProfilePageContainer};
