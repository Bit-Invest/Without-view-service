import React from 'react';
import ducks from '@cdx/ducks/';
import utils from '@cdx/utils/';
import configs from '@cdx/configs/';

export default class ParentWrapperPages extends React.Component {
  constructor({
    namePage,
    componentWillMount_cb,
  }) {
    super();

    this.actions = {};
    this.componentWillMount_cb = componentWillMount_cb;
    this.args = {
      namePage,
    };
  }

  componentWillMount() {
    this.actionsBuild();

    if (utils.common.isPagePrivate(this.args.namePage)) 
      this.isLoggedIn();

    this.componentWillMount_cb && 
      this.componentWillMount_cb();
  }

  isLoggedIn() {
    const tokens = utils.common.getAuthTokens();
    const timeDeathTokens = utils.auth.getTimeOfDeath();

    if (!tokens.accessToken || !tokens.refreshToken)
      this.props.history.push('/auth/sign-in');

    setTimeout(async () => {
      await this.actions['refreshTokens'](tokens);
      await this.actionsBuild();
    }, timeDeathTokens);
  }

  actionsBuild = () => {
    const tsActions = [
      ...(ducks[this.args.namePage] || {actions: []}).actions,
      ...(ducks.common.actions),
    ];

    this.requiredLoadPageBinding(tsActions);
  }

  requiredLoadPageBinding = (actions) => {
    this.actions = utils.common.submitActions(this.props.dispatch, actions);
  }
};
