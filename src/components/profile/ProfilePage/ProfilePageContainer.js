import * as React from 'react';
import { ProfilePage } from './ProfilePage';

export class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isShowedPopUpNewProduct: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({isLoaded: true});
    }, 2000);
  }

  onClickAddProduct() {
    this.setState({isShowedPopUpNewProduct: true});
  }

  onClosePopUp() {
    this.setState({isShowedPopUpNewProduct: false});
  }

  render() {
    const { onClickAddProduct, onClosePopUp } = this;

    return (
      <ProfilePage
        isLoaded={this.state.isLoaded}
        isShowedPopUpNewProduct={this.state.isShowedPopUpNewProduct}
        onClickAddProduct={onClickAddProduct.bind(this)}
        onClosePopUp={onClosePopUp.bind(this)}
      />
    );
  }
}
