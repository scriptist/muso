import React from 'react';

require('../styles/components/FilterBox.scss');

class FilterBox extends React.Component {
  render() {
    const { filterText, onChange } = this.props;

    return (
      <div
        className={['filterbox', filterText === '' ? 'filterbox--empty' : null]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          type="search"
          className="filterbox__input"
          onChange={(e) => onChange(e.target.value)}
          value={filterText}
        />
        <button
          className="filterbox__clear"
          onClick={() => onChange('')}
        >
          &times;
        </button>
      </div>
    );
  }
}

FilterBox.propTypes = {
  filterText: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default FilterBox;
