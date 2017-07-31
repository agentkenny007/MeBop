import React, { Component } from 'react';
import './App.css';

import AudioComponent from './components/AudioPlayer';
import Backbone from './modules/backbone';
import Navigator from './components/Navigator';
import { Filters } from './components/misc';

let bone = new Backbone(); // the backbone runs the app

class App extends Component {
  componentDidMount() { // the app is mounted, DOM nodes are ready
    bone.boot(); // boot the backbone
  }

  render() { // render the app's view
    return (
      <div className="App">
        <audio className="player" />
        <div className="container">
          <div className="monolith" />
          <AudioComponent name="major" />
          <div className="logo-icon" />
        </div>
        <div className="menu-icon"><span /></div>
        <Navigator /><Filters />
      </div>
    );
  }
}

export default App;
