import $ from 'jquery';
import ID from './cred';
let

AudioPlayer = function() {
  let audio = $('audio')[0],
      $current_time = $('.audio-player .current.time span'),
      $song_duration = $('.audio-player .duration span');
  this.nowPlaying = 0;
  this.lastTrackedValue = 0;
  this.songList = [];
  this.tracking = null;
  this.stepping = null;

  audio.addEventListener('ended', ()=>{ this.skip() }); // go to next song at songs end
  audio.addEventListener('timeupdate', ()=> 
    { // update the time tracker on the fly as long as there is no user input
      if ($('.tracker').hasClass('scrolling') === false && $('.tracker').hasClass('tracking') === false) // if user is not scrolling or tracking the time knob
        $('.progresscircle').val((audio.currentTime / audio.duration) * 100).trigger('change'); // set the value of the time knob based on current time
      $current_time.text(this.echoTime(audio.currentTime)); // update the current time
    });
  audio.addEventListener('loadeddata', ()=>
    {
      $song_duration.text(this.echoTime(audio.duration)); // update the duration of the current song
    });

  this.play = song => {
    let songFound = !!(song = song || this.songList[this.nowPlaying]);
    if (songFound){ // ensure there is a song to be played
      if (!audio.src.includes(song.stream)) // if current song does not match the song to play
        audio.src = `${song.stream}?client_id=${ID}`; // set the song to play
      audio.play(); // play or unpause song
      if ($('.audio-player').hasClass('playing')){ // if audio player is playing
        $('.icon').stop(true, false).animate({ "bottom" : "34.5%" }, 250, function() { // bounce the music icon
          $(this).animate({ "bottom" : "20%" }, 750)
        })
      } else { // audio player is paused (not playing)
        $('.icon').delay(345).animate({ "bottom" : "64.5%" }, 500, function() { // jump the music icon
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
    $('.icon').css({ "transform" : "scale(.5)", "z-index" : -1 }).stop(true, false).animate({ "bottom" : "14%", "opacity" : 0.725 }, 400, "linear", function() {
      $(this).css("transform", "scale(1)").animate({ "bottom" : "20%", "opacity" : 1, "z-index" : 1 }, 950)
    })
    $('.tracker.read-only .progresscircle').val(this.lastTrackedValue).trigger('change'); // set the value of read only time tracker

  };

  this.skip = () => {
    if ($('.tracker').hasClass('forw') === false) { // if player is not fast forwarding
      clearTimeout(this.tracking); // clear fast forwarding flag before it is set
      this.nowPlaying++; // increment now playing index designates next song
      if (this.nowPlaying >= this.songList.length) this.nowPlaying = 0; // start over if list ends
      this.play(this.songList[this.nowPlaying]); // play next song
    } else {
      clearTimeout(this.stepping); // stop fasting forward
      $('.tracker').removeClass('forw'); // remove fast forwarding flag
    }
  };

  this.recur = () => {
    if ($('.tracker').hasClass('rew') === false) { // if player is not rewinding
      clearTimeout(this.tracking); // clear rewinding flag before it is set
      this.nowPlaying--; // decrement now playing index designates previous song
      if (this.nowPlaying < 0) this.nowPlaying = this.songList.length - 1; // go to end of list if at beginning
      this.play(this.songList[this.nowPlaying]); // play previous song
    } else {
      clearTimeout(this.stepping); // stop rewinding
      $('.tracker').removeClass('rew'); // remove rewinding flag
    }
  };

  this.step = direction => { // to 'step' the track in a given direction (fast forward, rewind). goes nowhere if no direction is given or is NaN
    let d = direction || 0, step = audio.duration * d / 100; // the amount to step is 'd' percent of the audio duration where 'd' is the amount given by 'direction'.
    if (step) this.stepping = setInterval(()=>{ Math.round(audio.currentTime += step); }, 100); // step the current time in the given direction
  };

  this.echoTime = secs => {
    let hours = Math.floor( secs / 3600 ), // how many hours do the seconds make up?
        minutes = Math.floor( secs % 3600 / 60 ), // how many minutes do the seconds make up?
        seconds = Math.ceil( secs % 3600 % 60 ); // get the exact second, rounding up decimals
    return ( // return a string of the formatted time
      hours === 0 ? '' : // don't create the hours field if under an hour 
        hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : // create the hours field; add a '0' before the hour if under 10 hours
        hours + ':' // create the hours field
      ) + ( 
        minutes.toString().length < 2 ? '0' + minutes : // create the minutes field; add a '0' before the minute if under 10 minutes
        minutes // create the minutes field
      ) + ':' + ( // add mandatory colon
        seconds.toString().length < 2 ? '0' + seconds : // create the seconds field; add a '0' before the second if under 10 seconds
        seconds // create the seconds field
      );
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
