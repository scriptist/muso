/* eslint-disable no-underscore-dangle */
require('normalize.css');
require('../styles/App.scss');

import React from 'react';
import FilterBox from './FilterBox.jsx';
import Song from './Song.jsx';
import data from '../data';

const songs = Object.keys(data).sort().map(slug => Object.assign({}, data[slug], {
  slug,
  chords: data[slug].__content.replace(/^(\r?\n|\r)+|(\r?\n|\r)+$/g, ''), // Trim line breaks
}));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      selectedSong: null,
    };

    this.onBackClick = this.onBackClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSongClick = this.onSongClick.bind(this);
  }

  onBackClick() {
    this.setState({
      filterText: '',
      selectedSong: null,
    });
  }

  onFilterChange(text) {
    this.setState({
      filterText: text,
    });
  }

  onSongClick(slug) {
    this.setState({
      filterText: '',
      selectedSong: slug,
    });
  }

  filterSongs() {
    const filterText = this.state.filterText.toLowerCase().trim();
    const filterWords = filterText.split(' ');
    const filterFields = ['title', 'artist', 'slug'];

    const filteredSongs = songs.filter((song) => {
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
  render() {
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
      </div>
    );
  }
}

export default App;
