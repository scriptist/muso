import React from 'react';

require('../styles/components/RefreshButton.scss');

class RefreshButton extends React.Component {
  render() {
    return (
      <button className="refreshbutton" onClick={this.props.onClick}>
        Reload
      </button>
    );
  }
}

RefreshButton.propTypes = {
  loading: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default RefreshButton;
