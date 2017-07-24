import $ from 'jquery';
import ID from './cred';
import findSongs from './soundcloud';

let touch = 'ontouchstart' in window, // detect touchable document
    size = Math.round($(window).width() * 0.78), // calculate 78% of window width (for progress circle dimensions)

AudioPlayer = function() {
  let audio = $('audio')[0], // the primary audio element
      $audio_player = $('.audio-player'), // the audio player
      $current_time = $audio_player.find('.current.time span'), // the audio player song current time field
      $song_duration = $audio_player.find('.duration span'); // the audio player song duration field
  this.lastTrackedValue = 0; // to detect time of song when paused
  this.lastVolumeValue = 1; // to detect volume of song when muted
  this.nowPlaying = 0; // the index of currently playing song
  this.scrolling = null; // to clear progress scrolling
  this.songList = []; // the list of songs to play
  this.stepping = null; // to fast forward or rewind progress
  this.tracking = null; // to detect progress tracking

  audio.addEventListener('ended', ()=>{ this.skip() }); // go to next song at songs end
  audio.addEventListener('timeupdate', ()=> 
    { // update the time tracker on the fly as long as there is no user input
      if ($('.tracker').hasClass('scrolling') === false && $('.tracker').hasClass('tracking') === false) // if user is not scrolling or tracking the time knob
        $('.progresscircle').val((audio.currentTime / audio.duration) * 100).trigger('change'); // set the value of the time knob based on current time
      $current_time.text(this.echoTime(audio.currentTime)); // update the current time
    });
  audio.addEventListener('loadeddata', ()=>
    { // update player volume and song duration once song loads
      $song_duration.text(this.echoTime(audio.duration)); // update the duration of the current song
      this.lastVolumeValue = audio.volume; // use the current volume as the unmute volume
    });

  this.collectKey = e => { // to detect keyboard shortcuts (key fired)
    switch (e.which) { // what key?
      case 32: // the spacebar (play/pause song)
        $audio_player.hasClass('playing') ? this.pause() : this.play();
        break;
      case 37: this.recur(); // left arrow (previous song)
        break;
      case 39: this.skip(); // right arrow (next song)
        break;
      default: break;
    }
  };

  this.continue = () => { // to end fast forward/rewind
    clearTimeout(this.stepping); // stop stepping (fast forward, rewinding)
    $('.tracker').removeClass('forward backward'); // remove fast forward/rewind flags
  }

  this.detectKey = e => { // to detect keyboard shortcuts (key press started)
    switch (e.which) { // which key was pressed?
      case 37: // left arrow (try rewind)
        if (!$('.tracker').hasClass('backward')) this.press('backward'); // if not rewinding, try rewind
        break;
      case 39: // right arrow (try fast forward)
        if (!$('.tracker').hasClass('forward')) this.press('forward'); // if not fast forwarding, try fast forward
        break;
      default: break;
    }
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

  this.getSongs = () => // get songs and populate song list
    findSongs().then(songs => { // retrieve songs using soundcloud api
      this.songList = List(songs);console.log(this.songList) // map songs to songList array
      if ($audio_player.hasClass('error')){ // did the player break?
        $audio_player.removeClass('error'); this.play(); // remove error flag and play song
      } else $audio_player.find('.mini.title span').html(`<b style="font-size: 0.525em">songs loaded! ${ touch ? 'tap' : 'click' } triangle to play :-)</b>`); // update view if songs loaded
    }).catch(e => $audio_player.find('.mini.title span').html('<b style="font-size: 0.525em">error loading songs. :(</b>')); // update view if error loading songs

  this.init = () => {
    $audio_player.find('.tracker:not(.read-only) .progresscircle').knob({ // initialize trackable progress circle
      // options
        "width": size, "height": size, // size based on window width
        "displayInput": false, "displayPrevious": true,
        "fgColor": "#FFF28C", "bgColor": "rgba(255,255,255,0.25)",
        "lineCap": "round",
        "step": 0.5, "angleOffset": 180, "thickness": 0.05,
        'change': value => { // when circle value is changed (manual tracking)
          audio.currentTime = Math.round(audio.duration * value / 100); // update time according to given value (%)
        },
        'release': value => { // when circle is released (on scroll)
          if ($('.tracker').hasClass('tracking')) { // circle is being tracked manually
            $('.tracker').removeClass('tracking'); // clear manual tracking flag
            $('.progresscircle').trigger('configure', { "fgColor":"#FFF28C" }); // reset circle to primary colour
          } else if ($('.tracker').hasClass('scrolling')) // circle is being scrolled
            audio.currentTime = Math.round(audio.duration * value / 100); // update time according to value given (%)
        }
    });
    $audio_player.find('.tracker.read-only .progresscircle').knob({ // initialize read only progress circle
      //options
        "width": size, "height": size, // size based on window width
        "displayInput": false, "readOnly": true,
        "fgColor": "#FFF28C", "bgColor": "rgba(255,255,255,0.25)",
        "lineCap": "round",
        "angleOffset": 180, "thickness": 0.05
    });
    this.getSongs(); // retrieve songs to play
  };

  this.mute = () => { // to mute/unmute the audio playe
    if ($audio_player.find('.volume').hasClass('mute')) // is volume muted?
      audio.volume = this.lastVolumeValue; // unmute volume
    else {
      this.lastVolumeValue = audio.volume; audio.volume = 0;
    }
    $audio_player.find('.volume').toggleClass('mute') // toggle the mute flag
  };

  this.pause = () => { // to pause the audio player
    this.lastTrackedValue = $audio_player.find('.tracker:not(.read-only) input').val() // record value of time tracker
    $audio_player.removeClass('playing'); // indicate a paused audio player
    $('.monolith').removeClass('hidden'); // reveal the big logo
    // shrinking animation for music icon
    $('.logo-icon').css({ "transform" : "scale(.5)", "z-index" : -1 }).stop(true, false).animate({ "bottom" : "14%", "opacity" : 0.725 }, 400, "linear", function() {
      $(this).css("transform", "scale(1)").animate({ "bottom" : "20%", "opacity" : 1, "z-index" : 1 }, 950)
    })
    $('.tracker.read-only .progresscircle').val(this.lastTrackedValue).trigger('change'); // set the value of read only time tracker
    audio.pause(); // pause song
  };

  this.play = song => { // to play the audio player
    let songFound = !!( // return a boolean as to whether or not there is a song to play
      song = song.stream ? song // use the given song if it has a stream link
      : this.songList.length ? // otherwise, are there songs in the song list?
        this.songList[this.nowPlaying] // if so, use the currently playing song
        : 0); // otherwise, use '0' (no song found)

    if (songFound){ // ensure there is a song to be played (streamed)
      if (!audio.src.includes(song.stream)) // if current song does not match the song to play
        audio.src = `${song.stream}?client_id=${ID}`; // set the song to play
      $audio_player.find('.title span').attr("title", song.title).text(song.title); // update view of song title
      if ($audio_player.hasClass('playing')){ // if audio player is playing
        $('.logo-icon').stop(true, false).animate({ "bottom" : "34.5%" }, 250, function() { // bounce the music icon
          $(this).animate({ "bottom" : "20%" }, 750)
        })
      } else { // audio player is paused (not playing)
        $('.logo-icon').delay(345).animate({ "bottom" : "64.5%" }, 500, function() { // jump the music icon
          $(this).animate({ "bottom" : "20%" }, 1250)
        })
      }
      $audio_player.addClass('playing'); // indicate a playing audio player
      $('.monolith').addClass('hidden'); // hide the big logo
      audio.play(); // play song
    } else { // no song found
      $audio_player.addClass('error'); // indicate a broken audio player
      this.getSongs(); // try to load songs
    }
  };

  this.press = control => { // to start fast forward or rewind when respective control is pressed and held
    if (this.tracking) clearTimeout(this.tracking); // reset fast forward or rewind timeout
    this.tracking = setTimeout(()=>{ // set timeout to begin fast forward
        $('.tracker').addClass(control); // indicate a stepping progress circle (forward or backward)
        this.step(control === 'forward' ? 1 : -1); // fast forward or rewind in 1% increments
        this.tracking = null; // nullify timeout
    }, 450); // starts stepping when pressed for 450ms
  }

  this.recur = () => { // to go to the previous song
    if ($('.tracker').hasClass('backward') === false) { // if player is not rewinding
      clearTimeout(this.tracking); // clear rewinding flag before it is set
      this.nowPlaying--; // decrement now playing index designates previous song
      if (this.nowPlaying < 0) this.nowPlaying = this.songList.length - 1; // go to end of list if at beginning
      this.play(this.songList[this.nowPlaying]); // play previous song
    } else this.continue(); // stop rewinding
  };

  this.scroll = () => { // to scroll the progress circle
    if (!$('.tracker').hasClass('scrolling')) $('.tracker:not(.read-only)').addClass('scrolling'); // indicate scrolling on progress circle
    if (this.scrolling) clearTimeout(this.scrolling); // reset timeout to clear scrolling flag
    this.scrolling = setTimeout(() => { // set timeout to clear scrolling flag
        $('.tracker').removeClass('scrolling'); // indicate progress circle no longer scrolling
        this.scrolling = null; // nullify timeout
    }, 500); // clear flag if scrolling hasn't fired again after 0.5 seconds
  };

  this.skip = () => { // to go to the next song
    if ($('.tracker').hasClass('forward') === false) { // if player is not fast forwarding
      clearTimeout(this.tracking); // clear fast forwarding flag before it is set
      this.nowPlaying++; // increment now playing index designates next song
      if (this.nowPlaying >= this.songList.length) this.nowPlaying = 0; // start over if list ends
      this.play(this.songList[this.nowPlaying]); // play next song
    } else this.continue(); // stop fast forwarding
  };

  this.step = direction => { // to 'step' the track in a given direction (fast forward, rewind). goes nowhere if no direction is given or is NaN
    let d = direction || 0, step = audio.duration * d / 100; // the amount to step is 'd' percent of the audio duration where 'd' is the amount given by 'direction'.
    if (step) this.stepping = setInterval(()=>{ Math.round(audio.currentTime += step); }, 100); // step the current time in the given direction
  };

  this.track = () => { // to track the progress circle
    $audio_player.find('.tracker:not(.read-only)').addClass('tracking'); // indicate manual tracking on progress circle
    $audio_player.find('.tracker:not(.read-only) .progresscircle').trigger('configure', { "fgColor":"#d05000" }); // change color of progress circle to dark orange
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
