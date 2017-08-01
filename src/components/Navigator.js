import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';
import Backbone from '../modules/backbone';
import spacer from '../images/space.png';

export default class Navigator extends Component { // menu navigator
  render() {
    return (
        <div className="navigator">
            <AudioPlayer name="minor" />
            <Menu />
            <Lunette content={<Widget name="songs" ref={ reference => Backbone.saveRef('song-widget', reference) } />} />
            <Widget name="search" />
        </div>
    );
  }
}

class Lunette extends Component {
  render() {
    return (
      <div className="lunette">
        <div className="content">{ this.props.content || '' }</div>
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
              <div><img className="spacer" src={spacer} /><img className="art" src={song.artwork} alt={song.title} /><span className="play" data-stream={song.stream} /></div>
              <span className="title" title={song.title}>{song.title}</span>
              <span className="duration">{song.duration}</span>
          </div>
      </li>
    );
  }
}

export class SongList extends Component {
  render() {
    let songs = this.props.songs;    
    songs = songs && songs.length ? songs.map((song, i) => <SongCard key={i} song={song} />) : [];

    return (
      <div className="song-list"><ul>{ songs }</ul></div>
    );
  }
}

class Widget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: this.props.content
    };
  }

  place(compo) {
    this.setState({ 
      content: compo
    });
  }

  render() {
    let content = this.state.content,
        name = this.props.name;
    if (name && !content)
      switch (name) {
        case "search" : content = <SearchForm type="simple" />;
          break;
        
        case "songs" : content = <span className="void">No songs to show...</span>
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