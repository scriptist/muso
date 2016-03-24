import React from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';

require('styles/components/PullToRefresh.scss');

class Loader extends React.Component {
  render() {
    return (
      <ReactPullToRefresh className="pulltorefresh" onRefresh={this.props.onRefresh}>
        {this.props.children}
      </ReactPullToRefresh>
    );
  }
}

// Uncomment properties you need
Loader.propTypes = {
  children: React.PropTypes.node,
  onRefresh: React.PropTypes.func,
};
// FilterBox.defaultProps = {};

export default Loader;
