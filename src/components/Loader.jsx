import React from 'react';

require('styles/components/Loader.scss');

class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        Loading
      </div>
    );
  }
}

// Uncomment properties you need
Loader.propTypes = {
  children: React.PropTypes.element,
};
// FilterBox.defaultProps = {};

export default Loader;
