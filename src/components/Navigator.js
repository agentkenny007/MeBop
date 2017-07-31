import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

export class Navigator extends Component { // menu navigator
  render() {
    return (
        <div className="navigator">
            <AudioPlayer name="minor" />
            <Menu />
            <Lunette />
        </div>
    );
  }
}

class Menu extends Component {
  render() {
    return (
      <div className="menu"></div>
    );
  }
}

class Lunette extends Component {
  render() {
    return (
      <div className="lunette">
        { this.props.content || '' }
      </div>
    );
  }
}