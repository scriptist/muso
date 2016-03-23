import React from 'react';

require('styles/components/FilterBox.scss');

class FilterBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange(e) {
    const value = e.target.value;

    this.setState({
      filterText: value,
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <div className="filterbox">
        <input type="search" onChange={this._onChange} />
      </div>
    );
  }
}

// Uncomment properties you need
FilterBox.propTypes = {
  onChange: React.PropTypes.func,
};
// FilterBox.defaultProps = {};

export default FilterBox;
