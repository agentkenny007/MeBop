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

class PlaySpinner extends Component {
  render() {
    let songIndex = this.props.song;
    return (
      <div className="play-spinner">
        <div className="control" data-stream={songIndex}>
          <svg height="108" width="108">
            <circle strokeOpacity="0.1" fill="#FFFFFF" strokeWidth="7" cx="54" cy="54" r="48" className="circle back"></circle>
            <circle strokeWidth="7" fill="#FFFFFF" cx="54" cy="54" r="48" className="circle fill"></circle>
            <path className="play-arrow" d="M62.1556183,56.1947505 L52,62.859375 C50.6192881,63.7654672 49.5,63.1544098 49.5,61.491212 L49.5,46.508788 C49.5,44.8470803 50.6250889,44.2383396 52,45.140625 L62.1556183,51.8052495 C64.0026693,53.0173767 63.9947588,54.9878145 62.1556183,56.1947505 Z" fill="#FFFFFF"></path>
          </svg>
        </div>
      </div>
    );
  }
}

class SearchForm extends Component {
  render() {
    let defaults = [<input key={0} className="search-field" placeholder="search for song..."></input>],
        fields = this.props.fields,
        submit = <input type="submit" style={{display: "none"}} />,
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
        { submit }
      </form>
    );
  }
}

class SongCard extends Component {
  render() {
    let i = this.props.index,
        song = this.props.song;  

    return (
      <li>
          <div className="song-card">
              <div>
                <img className="spacer" alt="" src={spacer} />
                <img className="art" src={song.artwork} alt={song.title} />
                <PlaySpinner song={i} />
              </div>
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
    songs = songs && songs.length ? songs.map((song, i) => <SongCard key={i} index={i} song={song} />) : [];

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