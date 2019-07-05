import React from 'react';
import { connect } from 'react-redux';
import Contexts from '@modules/contexts';

import ParentWrapperPages from './parent-wrapper';
import MyProductComponent from '@cdx/jsx/myproduct/';

const Provider = Contexts.MyProductContext.Provider

class MyProductContainer extends ParentWrapperPages {
  constructor() {
    super({
      namePage: 'myproduct',
      componentWillMount_cb: () => {
        const { productId } = this.props.match.params;
        this.actions.getThisProduct({productId});
      },
    })
  }

  render() {
    const { productId } = this.props.match.params;

    return(
      <Provider value={{
        actions: this.actions,
      }}>
        <MyProductComponent 
          {...this.props}
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
