import * as React from 'react';
import { TraderCard } from './TraderCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showPopUp } from '@store/modules/common';

class TraderCardContainer extends React.Component {
  render() {
    return(
      <TraderCard
        onClick={this.onClickRoot.bind(this)}
        {...this.props}
      />
    );
  }

  onClickRoot() {
    this.props.showPopUp('productPage', {
      id: this.props.id
    });
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({showPopUp}, dispatch);

const connectedContainer =
  connect(null, mapDispatchToProps)(TraderCardContainer);

export {connectedContainer as TraderCardContainer};
