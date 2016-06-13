import React from 'react';

require('../styles/components/Loader.scss');

class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        Loading
      </div>
    );
  }
}

Loader.propTypes = {
  children: React.PropTypes.element,
};

export default Loader;
