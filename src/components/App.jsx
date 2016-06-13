require('normalize.css');
require('../styles/App.scss');
const yaml = require('js-yaml');

import React from 'react';
import FilterBox from './FilterBox.jsx';
import Loader from './Loader.jsx';
import RefreshButton from './RefreshButton.jsx';
import Song from './Song.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      reloading: false,
      songs: [],
      filterText: '',
      selectedSong: null,
    };

    this.onBackClick = this.onBackClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSongClick = this.onSongClick.bind(this);
  }

  componentWillMount() {
    if (!this.loadState()) {
      this.loadData();
    }
  }

  onBackClick() {
    this.setStateAndSave({
      selectedSong: null,
      filterText: '',
    });
  }

  onFilterChange(text) {
    this.setState({
      filterText: text,
    });
  }

  onRefresh() {
    this.loadData();
  }

  onSongClick(slug) {
    this.setStateAndSave({
      selectedSong: slug,
    });
  }

  setStateAndSave(state) {
    this.setState(state);

    const newState = Object.assign({}, this.state, state);
    delete newState.filterText;
    delete newState.loading;

    localStorage.setItem('muso-state', JSON.stringify(newState));
  }

  loadData() {
    this.setState({
      loading: true,
    });

    const request = new XMLHttpRequest();
    request.addEventListener('load', () => {
      this.parseData(request.responseText);
    });
    request.open('GET', '/data.yml');
    request.send();
  }

  loadState() {
    try {
      const state = JSON.parse(localStorage.getItem('muso-state'));
      if (!state) {
        return false;
      }

      this.setState(state);
    } catch (e) {
      return false;
    }

    return true;
  }

  filterSongs() {
    const filterText = this.state.filterText.toLowerCase().trim();
    const filterWords = filterText.split(' ');
    const filterFields = ['title', 'artist', 'slug'];

    const filteredSongs = this.state.songs.filter((song) => {
      if (this.state.selectedSong) {
        return this.state.selectedSong === song.slug;
      }

      if (filterText.length === 0) {
        return true;
      }

      let wordsMatched = 0;
      filterWords.forEach((word) => {
        for (const field of filterFields) {
          if (song[field].toLowerCase().indexOf(word) !== -1) {
            return wordsMatched++;
          }
        }

        return null;
      });

      return wordsMatched === filterWords.length;
    });

    if (this.state.selectedSong && filteredSongs.length === 0) {
      this.onBackClick();
      return this.state.songs;
    }

    return filteredSongs;
  }

  parseData(responseText) {
    this.setStateAndSave({
      loading: false,
      songs: yaml.safeLoad(responseText).sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      }),
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loader />
      );
    }

    const filterBox = this.state.selectedSong ? null : (
      <FilterBox onChange={this.onFilterChange} />
    );

    const filteredSongs = this.filterSongs();

    return (
      <div>
        {filterBox}
        {filteredSongs.map((song) => (
          <Song
            key={song.slug}
            onClick={this.onSongClick}
            onBackClick={this.onBackClick}
            expanded={!!this.state.selectedSong}
            {...song}
          />
        ))}
        {this.state.selectedSong ? null : (
          <RefreshButton onClick={this.onRefresh} />
        )}
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
