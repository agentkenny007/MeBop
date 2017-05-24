import $ from 'jquery';
import React, { Component } from 'react';
import './App.css';

$(document).on('submit', 'form', ()=>{ return false; });

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="audio-player">
            <audio className="player"></audio>
            <div className="info">Now Playing: <a className="loading" rel="noopener noreferrer" target="_blank">loading tracks...</a></div>
          </div>
          <div className="search-form">
            <form action="#">
              <input className="search-field" placeholder="search for music..."></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
