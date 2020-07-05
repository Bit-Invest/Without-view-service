import React from 'react';
import { Link } from 'react-router-dom';
import mixins from '@cdx/mixins/';
import configs from '@cdx/configs/';
import { phrases } from '@cdx/utils/common';

import ICON_PROFILE from '@assets/icons/Profile_icon.svg';
import ICON_MARKETPLACE from '@assets/icons/Billing_icon.svg';
import ICOM_HEADER_MENU from '@assets/icons/headerMenu.png';
import ICON_HEADER_LOGO from '@assets/images/headerLogoCindx.jpg';

import './style.scss';

export default class Header extends React.Component {
  logout = async () => {
    const {
      actions: {
        authLogout,
      },
    } = this.props;

    await authLogout();
    this.props.history.push('/auth/sign-in');
  }

  renderUserInfo = () => {
    const { userInfo } = this.props.reduxState;
    const userInfoNoLoaded = mixins.common.dataNoLoaded([userInfo]);

    if (userInfoNoLoaded[0] === configs.common.TYPES_RESULT['ERROR']) 
      return (
        <div className="headerSign">
          <Link className="item signIn" to={`/auth/sign-in`}>{phrases['header']['#3']}</Link>
          <Link className="item signUp" to={`/auth/sign-up`}>{phrases['header']['#4']}</Link>
        </div>
      );

    if (userInfoNoLoaded[1]) return userInfoNoLoaded[1];

    const resBlock = (
      <div className="userBlock">
        <div className="info">
          <div className="textUser nth1">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
          <div className="textUser nth2">{userInfo.email}</div>
        </div>
        <div className="imgUser">
          <span>{`${userInfo.firstName[0]}${userInfo.lastName[0]}`}</span>
          <span className="clickLogout" onClick={this.logout}></span>
        </div>
      </div>
    );

    return resBlock;
  }

  render() {    
    return(
      <div className="header">
        <div className="container">
          <div className="leftFix">
            <div className="mobileMenuIcon">
              <img className="icon" src={ICOM_HEADER_MENU} alt="menu" />
            </div>
            <div className="headerLogoIcon">
              <img className="icon" src={ICON_HEADER_LOGO} alt="menu" />
            </div>
            <div className="menu">
              <Link className="item active" to={`/im`}>
                <img src={ICON_PROFILE} alt="Here profile icon" />
                <div className="text">{phrases['header']['#1']}</div>
              </Link>
              <Link className="item" to={`/marketplace`}>
                <img src={ICON_MARKETPLACE} alt="Here marketplace icon" />
                <div className="text">{phrases['header']['#2']}</div>
              </Link>
            </div>
          </div>
          {this.renderUserInfo()}
        </div>
      </div>
    )
  }
};
