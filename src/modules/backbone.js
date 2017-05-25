import $ from 'jquery';
import ID from './cred';
let

AudioPlayer = function(){
  this.nowPlaying = 0;
  this.songList = [];

  this.play = song => {
    let audio = $('audio'), songFound = !!(song = song || this.songList[0]);
    if (songFound){ // ensure there is a song to be played
      if (!audio[0].src.includes(song.stream)) // if no paused song
        audio.attr("src", `${song.stream}?client_id=${ID}`);
      audio[0].play();
    }
    $('.audio-player').addClass('playing');
    $('.monolith').addClass('hidden');
  };

  this.pause = () => {
    $('audio')[0].pause();
    $('.audio-player').removeClass('playing');
    $('.monolith').removeClass('hidden');
  };

  this.skip = () => {
    this.nowPlaying++; // increment now playing index designates next song
    if (this.nowPlaying >= this.songList.length) this.nowPlaying = 0; // start over if list ends
    this.play(this.songList[this.nowPlaying]); // play next song
  };

  this.recur = () => {
    this.nowPlaying--; // decrement now playing index designates previous song
    if (this.nowPlaying <= 0) this.nowPlaying = this.songList.length - 1; // start over if list ends
    this.play(this.songList[this.nowPlaying]); // play previous song
  };
},

List = songs => {
  return songs.map(song => {
    return {
      title: song.title,
      duration: song.duration,
      artwork: song.artwork_url || song.user.avatar_url,
      genre: song.genre,
      format: song.original_format,
      stream: song.stream_url,
      webpage: song.permalink_url
    };
  });
};

export { AudioPlayer, List };
