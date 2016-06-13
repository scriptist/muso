import React from 'react';

require('../styles/components/BackButton.scss');

class BackButton extends React.Component {
  render() {
    return (
      <button className={`backbutton ${this.props.className}`} onClick={this.props.onClick}>
        Back
      </button>
    );
  }
}

BackButton.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default BackButton;
