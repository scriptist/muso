require('normalize.css');
require('styles/App.scss');
const yaml = require('js-yaml');

import React from 'react';
import FilterBox from './FilterBox.jsx';
import Loader from './Loader.jsx';
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
    if (!this.loadState()) {
      this.loadData();
    }
  }

  setStateAndSave(state) {
    this.setState(state);

    const newState = Object.assign({}, this.state, state);
    localStorage.setItem('muso-state', JSON.stringify(newState));
  }

  _onBackClick() {
    this.setState({
      selectedSong: null,
      filterText: '',
    });
  }

  _onFilterChange(text) {
    this.setState({
      filterText: text,
    });
  }

  _onSongClick(slug) {
    this.setStateAndSave({
      selectedSong: slug,
    });
  }

  loadData() {
    this.setState({
      loading: true,
    });

    const request = new XMLHttpRequest();
    request.addEventListener('load', this.parseData.bind(this, request));
    request.open('GET', '/data.yml');
    request.send();
  }

  loadState() {
    try {
      this.setState(JSON.parse(localStorage.getItem('muso-state')));
    } catch (e) {
      return false;
    }

    return true;
  }

  parseData(request) {
    this.setStateAndSave({
      loading: false,
      songs: yaml.safeLoad(request.responseText).sort((a, b) => {
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
      <FilterBox onChange={this._onFilterChange} />
    );

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
        {filteredSongs.map((song) => (
          <Song
            key={song.slug}
            onClick={this._onSongClick}
            onBackClick={this._onBackClick}
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
