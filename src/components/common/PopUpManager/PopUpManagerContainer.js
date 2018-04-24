import * as React from 'react';
import { PopUpManager } from './PopUpManager'

export class PopUpManagerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowed: this.props.isShowed
    };
  }

  render() {
    return (
      <PopUpManager
        isShowed={this.state.isShowed}
        onClickClose={this.closePopUp.bind(this)}
      >
        {this.props.children}
      </PopUpManager>
    );
  }

  closePopUp() {
    this.setState({isShowed: false});
  }
}
