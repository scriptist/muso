require('normalize.css');
require('styles/App.scss');
const yaml = require('js-yaml');

import React from 'react';
import Button from './Button.jsx';
import FilterBox from './FilterBox.jsx';
import Song from './Song.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      songs: [],
      filterText: '',
      selectedSong: null,
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSongClick = this._onSongClick.bind(this);
    this._onBackClick = this._onBackClick.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  _onBackClick() {
    this.setState({
      selectedSong: null,
    });
  }

  _onFilterChange(text) {
    this.setState({
      filterText: text,
    });
  }

  _onSongClick(slug) {
    this.setState({
      selectedSong: slug,
    });
  }

  loadData() {
    const request = new XMLHttpRequest();
    request.addEventListener('load', this.parseData.bind(this, request));
    request.open('GET', '/data.yml');
    request.send();
  }

  parseData(request) {
    this.setState({
      songs: yaml.safeLoad(request.responseText).sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      }),
    });
  }

  render() {
    const filterBox = this.state.selectedSong ? null : (
      <FilterBox onChange={this._onFilterChange} />
    );

    const back = this.state.selectedSong ? (
      <Button onClick={this._onBackClick}>Back</Button>
    ) : null;

    const filteredSongs = this.state.songs.filter((song) => {
      if (this.state.selectedSong) {
        return this.state.selectedSong === song.slug;
      }

      const filterText = this.state.filterText.toLowerCase().trim();
      return song.title.toLowerCase().indexOf(filterText) !== -1;
    });

    return (
      <div className="index">
        {filterBox}
        {back}
        {filteredSongs.map((song) => (
          <Song
            key={song.title}
            onClick={this._onSongClick}
            expanded={!!this.state.selectedSong}
            {...song}
          />
        ))}
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
