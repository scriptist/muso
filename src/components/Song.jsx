import React from 'react';

require('styles/components/Song.scss');

class Song extends React.Component {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.slug);
    }
  }

  renderContent() {
    if (!this.props.expanded) {
      return null;
    }

    return (
      <pre>
        {this.props.chords}
      </pre>
    );
  }

  render() {
    return (
      <div className="song" onClick={this._onClick}>
        {this.props.title} - {this.props.artist}
        {this.renderContent()}
      </div>
    );
  }
}

Song.propTypes = {
  slug: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  artist: React.PropTypes.string,
  chords: React.PropTypes.string,
  pdf: React.PropTypes.string,
  expanded: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default Song;
