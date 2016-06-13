import React from 'react';

import BackButton from './BackButton.jsx';

require('../styles/components/Song.scss');

class Song extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pdfPages: [1],
    };

    this.onClick = this.onClick.bind(this);
    this.onDocumentComplete = this.onDocumentComplete.bind(this);
  }

  onClick() {
    if (!this.props.expanded && this.props.onClick) {
      this.props.onClick(this.props.slug);
    }
  }

  onDocumentComplete(pages) {
    const pagesArr = [];
    for (let i = 1; i < pages + 1; i++) {
      pagesArr.push(i);
    }

    this.setState({
      pdfPages: pagesArr,
    });
  }

  testLine(line) {
    if (line.match(/^\s/)) return true;
    if (line.match(/^\|:/)) return true;
    if (line.match(/^\| ?[A-G][b#]?[m]?[679]? /)) return true;

    const chordRegex = new RegExp('([A-G][b#]?[m]?((6\\/9|11|13|[679]))?' +
      '((dim|dom|aug|sus|min|maj|add|no|m|M|-|\\+)(11|13|15|[23456789])?){0,2}' +
      '([b#\\-\\+][59]){0,2}(\\/[A-G][b#]?)?)(?=(-|/|\\\\|\\)|$))');
    if (line.match(chordRegex)) return true;

    return false;
  }

  renderContent() {
    if (!this.props.expanded) {
      return null;
    }

    if (this.props.pdf) {
      return (
        <div className="song__pdf">
          <iframe src={`https://docs.google.com/gview?url=http://muso.mikeyberman.com/sheets/${this.props.pdf}&embedded=true`} frameBorder="0" />
        </div>
      );
    }

    return (
      <pre className="song__chords">
        {this.props.chords.split('\n').map((line, i) => {
          const className = `song__chords__line${
            this.testLine(line)
            ? ' song__chords__line--chords'
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
    const back = this.props.expanded ? (
      <BackButton className="song__header__backbutton" onClick={this.props.onBackClick} />
    ) : null;
    const className = `song${this.props.expanded ? ' song--expanded' : ''}`;
    return (
      <article className={className} onClick={this.onClick}>
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
