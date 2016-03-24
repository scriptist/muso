import React from 'react';

import BackButton from './BackButton.jsx';

require('styles/components/Song.scss');

class Song extends React.Component {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    if (!this.props.expanded && this.props.onClick) {
      this.props.onClick(this.props.slug);
    }
  }

  renderContent() {
    if (!this.props.expanded) {
      return null;
    }

    return (
      <pre className="song__chords">
        {this.props.chords}
      </pre>
    );
  }

  render() {
    const back = this.props.expanded ? (
      <BackButton className="song__header__backbutton" onClick={this.props.onBackClick} />
    ) : null;
    const className = `song${this.props.expanded ? ' song--expanded' : ''}`;
    return (
      <article className={className} onClick={this._onClick}>
        <header className="song__header">
          {back}
          <h1 className="song__header__title">
            {this.props.title}
          </h1>
          <div className="song__header__artist">
            {this.props.artist}
          </div>
          <div className="song__header__label">
            {this.props.chords ? 'Chords' : 'PDF'}
          </div>
        </header>
        {this.renderContent()}
      </article>
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
  onBackClick: React.PropTypes.func,
};

export default Song;
