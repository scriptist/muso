require('normalize.css');
require('../styles/App.scss');

import React from 'react';

import FilterBox from './FilterBox.jsx';
import SongLink from './SongLink.jsx';
import songs from '../songs.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
    };

    this.onBackClick = this.onBackClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onBackClick() {
    this.setState({
      filterText: '',
    });
  }

  onFilterChange(text) {
    this.setState({
      filterText: text,
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
    if (this.props.children) {
      return this.props.children;
    }

    const filterBox = this.state.selectedSong ? null : (
      <FilterBox onChange={this.onFilterChange} />
    );

    const filteredSongs = this.filterSongs();

    return (
      <div>
        {filterBox}
        {filteredSongs.map((song) => (
          <SongLink
            key={song.slug}
            onBackClick={this.onBackClick}
            expanded={!!this.state.selectedSong}
            {...song}
          />
        ))}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
