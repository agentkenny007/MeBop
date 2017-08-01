import React, { Component } from 'react';
import './App.css';

import Backbone from './modules/backbone';
import Face from './components/Face';
import Navigator from './components/Navigator';
import { Filters } from './components/misc';

class App extends Component {
  componentDidMount() { // the app is mounted, DOM nodes are ready
    Backbone.boot(); // boot the backbone
  }

  render() { // render the app's view
    return (
      <div className="App">
        <Face /><Navigator /><Filters />
        <div className="menu-icon"><span /></div>
        <audio className="player" />
      </div>
    );
  }
}

export default App;
