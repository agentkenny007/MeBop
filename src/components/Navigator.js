import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

export class Navigator extends Component { // menu navigator
  render() {
    return (
        <div className="navigator">
            <AudioPlayer name="minor" />
        </div>
    );
  }
}