require('normalize.css');
require('styles/App.scss');
const yaml = require('js-yaml');

import React from 'react';
import FilterBox from './FilterBox.js';
import Song from './Song.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      songs: [],
    };
  }

  componentWillMount() {
    this.loadData();
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
    return (
      <div className="index">
        <FilterBox />
        {this.state.songs.map((song) => (
          <Song key={song.title} {...song} />
        ))}
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
