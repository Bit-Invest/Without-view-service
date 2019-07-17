import React from 'react';
import { Redirect } from "react-router-dom";

export default class RedirectComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      redirecting: false,
    };
  }

  componentWillMount() {
    this.setState({
      redirecting: true,
    })
  }

  render() {
    return this.state.redirecting && <Redirect to={this.props.to} />;
  }
}