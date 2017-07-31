import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

export class Navigator extends Component { // menu navigator
  render() {
    return (
        <div className="navigator">
            <AudioPlayer name="minor" />
            <Menu />
            <Lunette />
            <Widget name="search" content={<SearchForm type="simple" />} />
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
    let defaults = [<input className="search-field" placeholder="search for song..."></input>],
        fields = this.props.fields,
        type = this.props.type;

    if (fields && fields.length) fields = fields.map(field => <input className={`${field}-field filter`}  placeholder={`add ${field}...`}></input>)
    else if (type)
      switch (type) {
        case "simple" : defaults.push(<input className="artist-field" placeholder="add artist...?"></input>)
          break;
      
        default: break;
      };
    
    return (
      <form className={`${type?type+' ':''}search-form`}>
        { defaults }
        { fields }
      </form>
    );
  }
}