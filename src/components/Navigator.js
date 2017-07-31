import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

export class Navigator extends Component { // menu navigator
  render() {
    return (
        <div className="navigator">
            <AudioPlayer name="minor" />
            <Menu />
            <Lunette />
            <Widget name="search" content={<SearchForm fields={["artist"]} />} />
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

class Widget extends Component {
  render() {
    return (
      <div className={`${this.props.name ? this.props.name + ' ' : ''}widget`}>
        { this.props.content || '' }
      </div>
    );
  }
}

class SearchForm extends Component {
  render() {
    let fields = this.props.fields;
    if (fields && fields.length) fields = fields.map(field => <input className={`${field}-field`}  placeholder={`add ${field}...?`}></input>)
    
    return (
      <form className="search-form">
        <input className="search-field" placeholder="search for song..."></input>
        { fields }
      </form>
    );
  }
}