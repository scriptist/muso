import React from 'react';

require('styles/components/Button.scss');

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.element.isRequired,
  onClick: React.PropTypes.func,
};

export default Button;
