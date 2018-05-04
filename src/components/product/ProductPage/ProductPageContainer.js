import * as React from 'react';
import { ProductPage } from './ProductPage';

export class ProductPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({isLoaded: true});
    }, 500);
  }

  render() {
    return (
      <ProductPage isLoaded={this.state.isLoaded} />
    );
  }
}