import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import SongPage from './components/SongPage';
import songs from './songs.js';

function scrollToTop() {
  window.scrollTo(0, 0);
}

// Render the main component into the dom
ReactDOM.render((
  <Router history={browserHistory} onUpdate={scrollToTop}>
    <Route path="/" component={App}>
      {songs.map(song => (
        <Route key={song.slug} path={song.slug} component={SongPage} song={song} />
      ))}
    </Route>
  </Router>
), document.getElementById('app'));
