import React from 'react';

export default class DrowDown extends React.Component {
  constructor() {
    super();

    this.state = {
      isShow: false,
    };
  }

  toggleShowContent = () => {
    const { isShow } = this.state;

    this.setState({
      isShow: !isShow,
    });
  }

  render() {
    const { Head, Content } = this.props;
    const { isShow } = this.state;

    const resList = [
      <Head 
        isShow={isShow}
        drowdownContent={this.toggleShowContent}
      />,
    ];

    if (isShow)
      resList.push(
        <Content 
          isShow={isShow}
          drowdownContent={this.toggleShowContent}
        />
      );

    return resList;
  }
};
