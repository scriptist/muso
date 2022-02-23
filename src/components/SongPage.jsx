import React from 'react';

import BackButton from './BackButton.jsx';

require('../styles/components/SongPage.scss');

class SongPage extends React.Component {
  testLine(line) {
    if (!line) return false;
    if (line.match(/^\s+[A-G][b#]?(m|maj)?[679]?\s/)) return true;
    if (line.match(/^\|:/)) return true;
    if (line.match(/^\| ?[A-G][b#]?(m|maj)[679]? /)) return true;

    const lettersCount = line.split('').filter((char) => char !== ' ').length;
    if (lettersCount >= 20) return false;

    const chordRegex = new RegExp('([A-G][b#]?[m]?((6\\/9|11|13|[679]))?' +
      '((dim|dom|aug|sus|min|maj|add|no|m|M|-|\\+)(11|13|15|[23456789])?){0,2}' +
      '([b#\\-\\+][59]){0,2}(\\/[A-G][b#]?)?)(?=(-|/|\\\\|\\)|$))');
    if (line.match(chordRegex)) return true;

    const lineRegex = /^^([A-G][b#]?m?7?\s*)*$/;
    if (line.match(lineRegex)) return true;

    return false;
  }

  renderContent(song) {
    if (song.pdf) {
      return (
        <div className="song-page__pdf">
          <iframe src={`https://docs.google.com/gview?url=http://muso.mikeyberman.com/sheets/${song.pdf}&embedded=true`} frameBorder="0" />
        </div>
      );
    }

    if (song.type === 'lyrics') {
      return (
        <div className="song-page__lyrics">
          {song.data}
        </div>
      );
    }

    return (
      <pre className="song-page__chords">
        {song.data.split('\n').map((line, i) => {
          const className = `song-page__chords__line${
            this.testLine(line)
            ? ' song-page__chords__line--chords'
            : ''}
          `;
          return (
            <div key={`${i}:${line}`} className={className}>
              {line}
            </div>
          );
        })}
      </pre>
    );
  }

  render() {
    const { song } = this.props.route;

    return (
      <article className="song-page">
        <header className="song-page__header">
          <BackButton className="song-page__header__backbutton" />
          <h1 className="song-page__header__title">
            {song.title}
          </h1>
          <div className="song-page__header__artist">
            {song.artist}
          </div>
          <div className="song-page__header__label">
            {song.chords ? 'Chords' : 'PDF'}
          </div>
        </header>
        {this.renderContent(song)}
      </article>
    );
  }
}

SongPage.propTypes = {
  route: React.PropTypes.object.isRequired,
};

export default SongPage;
