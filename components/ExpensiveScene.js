import React from 'react';

export default class ExpensiveScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {renderPlaceholderOnly: true};
  }

  componentDidMount() {
    setTimeout(() => {
      if (this._unmounted) return;
      this.setState({renderPlaceholderOnly: false});
    }, 500);
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return (
      this.props.children
    );
  }


  _renderPlaceholderView() {
    return (
      null
    );
  }
}
