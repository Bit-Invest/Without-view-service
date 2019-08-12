import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';

import ParentWrapperPages from './parent-wrapper';
import MyProductComponent from '@cdx/jsx/myproduct/';

const Provider = Contexts.MyProductContext.Provider;

class MyProductContainer extends ParentWrapperPages {
  constructor() {
    super({
      namePage: 'myproduct',
      componentWillMount_cb: () => {
        this.listenerCommonEvents();

        const { productId } = this.props.match.params;
        this.actions.getThisProduct({productId});
      },
    });

    this.state = {
      cdxWindowActive: false,
    };
  }

  listenerCommonEvents = () => {
    window.addEventListener('blur', () => {
      this.setState({cdxWindowActive: false});
    });

    window.addEventListener('focus', () => {
      this.setState({cdxWindowActive: true});
    });
  }

  render() {
    const { productId } = this.props.match.params;
    const { cdxWindowActive } = this.state;

    return(
      <Provider value={{
        actions: this.actions,
      }}>
        <MyProductComponent 
          {...this.props}
          commonState={{cdxWindowActive}}
          paramsProduct={{
            productId,
          }} 
        />
      </Provider>
    );
  }
};

const mapStateToProps = state => ({
  reduxState: {
    ...state.common,
    ...state.myproduct,
  },
  state,
});

export default connect(
  mapStateToProps,
)(MyProductContainer);
