import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

export default class Navigator extends Component { // menu navigator
  render() {
    return (
        <div className="navigator">
            <AudioPlayer name="minor" />
            <Menu />
            <Lunette content={<Widget name="songs" />} />
            <Widget name="search" />
        </div>
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

class Menu extends Component {
  render() {
    return (
      <div className="menu"></div>
    );
  }
}

class SearchForm extends Component {
  render() {
    let defaults = [<input key={0} className="search-field" placeholder="search for song..."></input>],
        fields = this.props.fields,
        type = this.props.type;

    if (fields && fields.length) fields = fields.map((field, i) => <input key={i} className={`${field}-field filter`}  placeholder={`add ${field}...`}></input>)
    else if (type)
      switch (type) {
        case "simple" : defaults.push(<input key={defaults.length} className="artist-field" placeholder="add artist...?"></input>)
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

class SongCard extends Component {
  render() {
    let song = this.props.song;    

    return (
      <li>
          <div className="song-card">
              <div><img src={song.artwork} /><span className="play" data-stream={song.stream}></span></div>
              <span className="title" title={song.title}>{song.title}</span>
              <span className="duration">{song.duration}</span>
          </div>
      </li>
    );
  }
}

class SongList extends Component {
  render() {
    let songs = this.props.songs;    
    songs = songs && songs.length ? songs.map((song, i) => <SongCard key={i} song={song} />) : [];

    return (
      <div className="songs"><ul>{ songs }</ul></div>
    );
  }
}

class Widget extends Component {
  render() {
    let content = this.props.content,
        name = this.props.name;
    if (name && !content)
      switch (name) {
        case "search" : content = <SearchForm type="simple" />;
          break;
        
        case "songs" : content = <SongList />
          break;
      
        default: break;
      };

    return (
      <div className={`${ name ? name + ' ' : ''}widget`}>
        { content || '' }
      </div>
    );
  }
}