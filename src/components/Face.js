import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

export default class Face extends Component { // app face
  render() {
    return (
        <div className="face">
          <div className="logo-mono" />
          <AudioPlayer name="major" />
          <div className="logo-icon" />
        </div>
    );
  }
}