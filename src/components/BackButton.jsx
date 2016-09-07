import React from 'react';
import { Link } from 'react-router';

require('../styles/components/BackButton.scss');

class BackButton extends React.Component {
  render() {
    return (
      <Link to="/" className={`backbutton ${this.props.className}`}>
        Back
      </Link>
    );
  }
}

BackButton.propTypes = {
  className: React.PropTypes.string,
};

export default BackButton;
