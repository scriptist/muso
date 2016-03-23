import React from 'react';

require('styles/components/Song.scss');

class Song extends React.Component {
  render() {
    return (
      <div className="song">
        {this.props.title} - {this.props.artist}
      </div>
    );
  }
}

Song.propTypes = {
  artist: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  chords: React.PropTypes.string,
  pdf: React.PropTypes.string,
};

export default Song;
