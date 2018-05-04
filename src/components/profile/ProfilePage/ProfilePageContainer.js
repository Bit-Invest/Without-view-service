import * as React from 'react';
import { ProfilePage } from './ProfilePage';

export class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({isLoaded: true});
    }, 2000);
  }

  render() {
    return (
      <ProfilePage isLoaded={this.state.isLoaded} />
    );
  }
}
