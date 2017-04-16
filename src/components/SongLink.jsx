import React from 'react';
import { Link } from 'react-router';

require('../styles/components/SongLink.scss');

class SongLink extends React.Component {
  type() {
    if (!this.props) return '';
    if (this.props.pdf) return 'PDF';
    if (this.props.type === 'lyrics') return 'Lyrics';
    return 'Chords';
  }

  render() {
    return (
      <Link to={this.props.slug} className="song-link">
        <header className="song-link__header">
          <h1 className="song-link__header__title">
            {this.props.title}
          </h1>
          <div className="song-link__header__artist">
            {this.props.artist}
          </div>
          <div className="song-link__header__label">
            {this.type()}
          </div>
        </header>
      </Link>
    );
  }
}

SongLink.propTypes = {
  slug: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  artist: React.PropTypes.string,
  chords: React.PropTypes.string,
  type: React.PropTypes.string,
  pdf: React.PropTypes.string,
  expanded: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onBackClick: React.PropTypes.func,
};

export default SongLink;
