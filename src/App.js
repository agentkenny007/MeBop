import $ from 'jquery';
import React, { Component } from 'react';
import './App.css';

import { AudioPlayer } from './modules/backbone';
import AudioComponent from './components/AudioPlayer';
import { Navigator } from './components/Navigator';
import './modules/knob';

let touch = 'ontouchstart' in window; // detect touchable document

class App extends Component {
  componentDidMount() { // the app is mounted, DOM nodes are ready
    let player = new AudioPlayer(), // audio player instance
        run = () => { // init function
          player.init(); // initialize audio player
        };

    $(document) // register live events
      .on('click', '.audio-player .play', player.play) // when the play button is clicked, play
      .on('click', '.audio-player .playpause', player.playOrPause) // when the playpause button is clicked, toggle play or pause
      .on('click', '.audio-player .pause', player.pause) // when the pause button is clicked, pause
      .on('click', '.audio-player .next', player.skip) // when the next button is clicked, skip forward
      .on('click', '.audio-player .prev', player.recur) // when the prev button is clicked, skip backward
      .on('click', '.audio-player .volume .icon', player.mute) // when the volume icon is clicked, toggle mute
      .on('click', '.menu-icon', ()=>{ $('.App').toggleClass('explore') }) // when the menu icon is clicked, open the navigator
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .next', () => player.press('forward', 1)) // when the next button is pressed, try fast forwarding in 1% increments
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .prev', () => player.press('backward', 1)) // when the prev button is pressed, try rewinding in 1% decrements
      .on(touch ? 'touchstart' : 'mousedown', '.tracker:not(.read-only) canvas', player.track) // when the progress circle is pressed, start tracking
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .scrubber > div', e => player.adjustVolume(e, 'start')) // when the volume scrubber is clicked, adjust volume
      .on(touch ? 'touchmove' : 'mousemove', '.audio-player .scrubber', e => player.adjustVolume(e, 'move')) // when the volume scrubber is dragged, adjust volume
      .on(touch ? 'touchend touchcancel' : 'mouseup mouseleave', '.audio-player .scrubber', e => player.adjustVolume(e, 'end')) // when the volume scrubber is released, stop adjusting volume
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .progress-bar', e => player.adjustTime(e, 'start')) // when the volume scrubber is clicked, adjust volume
      .on(touch ? 'touchmove' : 'mousemove', '.audio-player.minor', e => player.adjustTime(e, 'move')) // when the volume scrubber is dragged, adjust volume
      .on(touch ? 'touchend touchcancel' : 'mouseup mouseleave', '.audio-player.minor', e => player.adjustTime(e, 'end')) // when the volume scrubber is released, stop adjusting volume
      .on(touch ? 'touchend' : 'mouseleave', '.audio-player .prev, .audio-player .next', player.continue) // stop fast forward/rewind on mobile
      .on('mousewheel DOMMouseScroll', '.tracker:not(.read-only) canvas', player.scroll) // when progress circle is scrolled, start scrolling
      .on('keydown', player.detectKey) // when a keystroke is started
      .on('keyup', player.collectKey) // when a keystroke is fired
      .on('submit', 'form', () => { return false; }) // do not refresh page on form submit
      .ready(run); // when the document is ready, init
    
    $(window).resize(() => { // when the window is resized
        let size = Math.round($(window).width() * 0.78); // calculate 78% of window width (for progress circle dimensions)        
        $('.progresscircle').trigger('configure', { "width":size, "height":size, }); // set size of time tracker
    })
  }

  render() { // render the app's view
    return (
      <div className="App">
        <audio className="player"></audio>
        <div className="container">
          <div className="monolith"></div>
          <AudioComponent name="major" />
          {/* <div className="search-form">
            <form action="#">
              <input className="search-field" placeholder="search for music..."></input>
            </form>
          </div> */}
          <div className="logo-icon"></div>
        </div>
        <div className="menu-icon"><span></span></div>
        <Navigator />
        <svg xmlns="http://www.w3.org/2000/svg"  version="1.1">
          <defs>
            <filter id="blur">
              <feGaussianBlur stdDeviation="8"/>
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
}

export default App;
