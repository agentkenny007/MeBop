import $ from 'jquery';
import ID from './cred';
let

AudioPlayer = function(){
  let audio = $('audio')[0];
  this.nowPlaying = 0;
  this.lastTrackedValue = 0;
  this.songList = [];

  audio.addEventListener('ended', ()=>{ this.skip() }); // go to next song at songs end
  audio.addEventListener('timeupdate', ()=> 
    { // update the time tracker on the fly as long as there is no user input
      if ($('.tracker').hasClass('scrolling') === false && $('.tracker').hasClass('tracking') === false) // if user is not scrolling or tracking the time knob
        $('.timeknob').val((audio.currentTime / audio.duration) * 100).trigger('change'); // set the value of the time knob based on current time
    });

  this.play = song => {
    let songFound = !!(song = song || this.songList[this.nowPlaying]);
    if (songFound){ // ensure there is a song to be played
      if (!audio.src.includes(song.stream)) // if current song does not match the song to play
        audio.src = `${song.stream}?client_id=${ID}`; // set the song to play
      audio.play(); // play or unpause song
      if ($('.audio-player').hasClass('playing')){ // if audio player is playing
        $('.icon').stop(true, false).animate({ "bottom" : "34.5%" }, 250, function(){ // bounce the music icon
          $(this).animate({ "bottom" : "20%" }, 750)
        })
      } else { // audio player is paused (not playing)
        $('.icon').delay(345).animate({ "bottom" : "64.5%" }, 500, function(){ // jump the music icon
          $(this).animate({ "bottom" : "20%" }, 1250)
        })
      }
      $('.audio-player').addClass('playing'); // indicate a playing audio player
      $('.monolith').addClass('hidden'); // hide the big logo
    }
  };

  this.pause = () => {
    audio.pause(); // pause song
    this.lastTrackedValue = $('.audio-player .tracker:not(.read-only) input').val() // record value of time tracker
    $('.audio-player').removeClass('playing'); // indicate a paused audio player
    $('.monolith').removeClass('hidden'); // reveal the big logo
    // shrinking animation for music icon
    $('.icon').css({ "transform" : "scale(.5)", "z-index" : -1 }).stop(true, false).animate({ "bottom" : "14%", "opacity" : 0.725 }, 400, "linear", function(){
      $(this).css("transform", "scale(1)").animate({ "bottom" : "20%", "opacity" : 1, "z-index" : 1 }, 950)
    })
    $('.tracker.read-only .timeknob').val(this.lastTrackedValue).trigger('change'); // set the value of read only time tracker

  };

  this.skip = () => {
    this.nowPlaying++; // increment now playing index designates next song
    if (this.nowPlaying >= this.songList.length) this.nowPlaying = 0; // start over if list ends
    this.play(this.songList[this.nowPlaying]); // play next song
  };

  this.recur = () => {
    this.nowPlaying--; // decrement now playing index designates previous song
    if (this.nowPlaying < 0) this.nowPlaying = this.songList.length - 1; // go to end of list if at beginning
    this.play(this.songList[this.nowPlaying]); // play previous song
  };
},

List = songs => {
  return songs.map(song => { // set up songs to mirror db models
    return {
      title: song.title,
      duration: song.duration,
      artwork: song.artwork_url || song.user.avatar_url,
      genre: song.genre,
      format: song.original_format,
      stream: song.stream_url,
      link: song.permalink_url
    };
  });
};

export { AudioPlayer, List };
