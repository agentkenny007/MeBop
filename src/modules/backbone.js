import $ from 'jquery';
import React from 'react';
import ID from './cred';
import findSongs from './soundcloud';
import './knob';
import { SongList } from '../components/Navigator';

class Backbone { // the Backbone class
  /* |-------------------------------------------------------------------------------------
  /* | This is the Backbone. It is not a component, it is the "spine" that runs the app.
  /* | The Backbone is in charge of booting the app once it is mounted, and pretty much 
  /* | everything else after that. It initialises the audio player as well as registers
  /* | live event handlers and settings.
  /* |
  /* | The Backbone is itself initialised before it is exported. This means that The Back-
  /* | bone can be use anywhere in the app, within any ES6 module, simply by importing it.
  /* | No matter where you call it from, the reference is always to the same Backbone ins-
  /* | ance 'bone' (little bone) constructed at the end of this module.
  /* |
  /* | Little bone can even be called from within this module to control things like apply-
  /* | ing settings and DOM insertion. That's because any reference saved to the Backbone
  /* | gets attached to little bone. Essentially, little bone runs the app.
  /* \-------------------------------------------------------------------------------------
  *//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**////

  constructor() {
    this.refs = []; // to store DOM references
  }

  boot() { // to boot and run the app
    let player = new AudioPlayer(), // audio player instance
        init = () => { // init function
          player.init(); // initialize audio player
        };

    $(document) // register live events
      .on('click', '.audio-player .play', player.play) // when the play button is clicked, play
      .on('click', '.audio-player .playpause', player.playOrPause) // when the playpause button is clicked, toggle play or pause
      .on('click', '.audio-player .pause', player.pause) // when the pause button is clicked, pause
      .on('click', '.audio-player .next', player.skip) // when the next button is clicked, skip forward
      .on('click', '.audio-player .prev', player.recur) // when the prev button is clicked, skip backward
      .on('click', '.audio-player .volume .icon', player.mute) // when the volume icon is clicked, toggle mute
      .on('click', '.menu-icon', ()=>{ $('.App').toggleClass('explore') }) // when the menu icon is clicked, open the navigator
      .on('click', '.play-spinner .control', function(){ player.play(player.songList[this.dataset.stream]); }) // when the song card play spinner is clicked, play the song
      .on('keydown', player.detectKey) // when a keystroke is started
      .on('keyup', player.collectKey) // when a keystroke is fired
      .on('mousewheel DOMMouseScroll', '.tracker:not(.read-only) canvas', player.scroll) // when progress circle is scrolled, start scrolling
      // .on('submit', 'form', () => { return false; }) // do not refresh page on form submit
      .on('submit', '.simple.search-form', function(){ // when the simple search form is submitted, try searching for songs
        let $audio_player = $('.audio-player'), // the audio player
            form = $(this), // the simple search form
            song = form.find('.search-field').val(), // song title to search for
            artist = form.find('.artist-field').val(), // artist to search for
            query = song ? artist ? song + ' ' + artist : song : artist ? artist : ''; // construct query with given data
        if (query)
          findSongs(query).then(songs => { // retrieve songs using soundcloud api
            let songList = player.songList = List(songs); console.log(songList) // map songs to songList array
            bone.getRef('song-widget').place(<SongList songs={songList} />); // update the song widget with a list of song cards
            if ($audio_player.hasClass('error')) // did the player break? (flag is set)
              $audio_player.removeClass('error'); // remove error flag
          }).catch(e => $audio_player.find('.mini.title span').html(`
            <b>error finding songs${ song ? artist ? ' titled ' + song + ' by ' + artist : ' titled ' + song : artist ? ' by ' + artist : '' }. :(</b>`)); // update view if error loading songs
      })
      .on(touch ? 'touchend' : 'mouseleave', '.audio-player .prev, .audio-player .next', player.continue) // stop fast forward/rewind on mobile
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .next', () => player.press('forward', 1)) // when the next button is pressed, try fast forwarding in 1% increments
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .prev', () => player.press('backward', 1)) // when the prev button is pressed, try rewinding in 1% decrements
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .scrubber > div', e => player.adjustVolume(e, 'start')) // when the volume scrubber is clicked, adjust volume
      .on(touch ? 'touchmove' : 'mousemove', '.audio-player .scrubber', e => player.adjustVolume(e, 'move')) // when the volume scrubber is dragged, adjust volume
      .on(touch ? 'touchend touchcancel' : 'mouseup mouseleave', '.audio-player .scrubber', e => player.adjustVolume(e, 'end')) // when the volume scrubber is released, stop adjusting volume
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .progress-bar', e => player.adjustTime(e, 'start')) // when the volume scrubber is clicked, adjust volume
      .on(touch ? 'touchmove' : 'mousemove', '.audio-player.minor', e => player.adjustTime(e, 'move')) // when the volume scrubber is dragged, adjust volume
      .on(touch ? 'touchend touchcancel' : 'mouseup mouseleave', '.audio-player.minor', e => player.adjustTime(e, 'end')) // when the volume scrubber is released, stop adjusting volume
      .on(touch ? 'touchstart' : 'mousedown', '.tracker:not(.read-only) canvas', player.track) // when the progress circle is pressed, start tracking
      .ready(init); // when the document is ready, init
    
    $(window).resize(() => { // when the window is resized
        let size = Math.round($(window).width() * 0.78); // calculate 78% of window width (for progress circle dimensions)        
        $('.progresscircle').trigger('configure', { "width":size, "height":size, }); // set size of time tracker
    });
  }

  getRef(id) {
    return this.refs[id];
  }

  saveRef(id, R) {
    this.refs[id] = R;
  }
};

let touch = 'ontouchstart' in window, // detect touchable document
    size = Math.round($(window).width() * 0.78), // calculate 78% of window width (for progress circle dimensions)

AudioPlayer = function() { // sets up the audio player (constructor function)
  let audio = $('audio')[0], // the primary audio element
      $audio_player = $('.audio-player'), // the audio player
      $current_time = $audio_player.find('.current.time span'), // the audio player song current time field
      $progress_bar = $audio_player.find('.progress-bar'), // the audio player progress tracker (bar)
      $scrubber = $('.scrubber > div'), // the audio player volume scrubber
      $song_duration = $audio_player.find('.duration span'), // the audio player song duration field
      $song_volume = $audio_player.find('.volume'), // the audio player volume control
      $tracker = $('.tracker'); // the audio player progress tracker (knob)
  this.lastTrackedValue = 0; // to record time of song when paused
  this.lastVolumeValue = 1; // to record volume of song when muted
  this.nowPlaying = 0; // the index of currently playing song
  this.scrolling = null; // to clear progress scrolling
  this.songList = []; // the list of songs to play
  this.stepping = null; // to fast forward or rewind progress
  this.tracking = null; // to detect progress tracking

  audio.addEventListener('ended', ()=>{ this.skip() }); // go to next song at songs end
  audio.addEventListener('loadeddata', ()=>{ this.setupSong() }); // initialise song once loaded
  audio.addEventListener('timeupdate', ()=>{ this.updateTime() }); // update view with time of song
  audio.addEventListener('volumechange', ()=>{ this.changeVolume() }); // update view with song volume

  this.adjustTime = (e, eType) => { // to adjust the song's current time
    if (eType === 'start' && !$progress_bar.hasClass('tracking')) $progress_bar.addClass('tracking'); // indicate manual tracking on progress bar (set flag)
    if (eType === 'end') $progress_bar.removeClass('tracking'); // indicate progress bar tracking release (remove flag)
    if ($progress_bar.hasClass('tracking')) {
      e	= touch ? e.originalEvent.touches[0] : e; // mouse or touch event?
      let value =  Math.round((audio.duration * (e.pageX - $progress_bar.offset().left)) / $progress_bar[0].clientWidth);
			if (value) audio.currentTime = value;      
    }
  };
 
  this.adjustVolume = (e, eType) => { // to adjust the songs volume
    if (eType === 'start' && !$scrubber.hasClass('scrubbing')) $scrubber.addClass('scrubbing'); // indicate a scrubbing volume adjuster (set flag)
    if (eType === 'end') $scrubber.removeClass('scrubbing'); // indicate volume adjuster scrubbing release (remove flag)
    if ($scrubber.hasClass('scrubbing')) { // adjust song volume if flag is set
      e	= touch ? e.originalEvent.touches[0] : e; // mouse or touch event?
      const $SCRUBBER = $(e.target).closest('.scrubber > div'); // get the right scrubber (based on user input)
      if ($SCRUBBER.length) { // does e.target return the scrubber?
        let value = Math.abs((e.pageY - ($SCRUBBER.offset().top + $SCRUBBER[0].clientHeight)) / $SCRUBBER[0].clientHeight); // value derived from where the cursor/finger is dragged over the scrubber
        audio.volume = value > 1 ? 1 : value < 0 ? 0 : value; // adjust the volume according to value, assuring value is within the range [0, 1]
      }
    }
  };

  this.changeVolume = () => { // to update the view as the volume is adjusted
    $scrubber.find('div').height(audio.volume * 100 + '%'); // update the scrubber height
    if (audio.volume > 0 && $song_volume.hasClass('mute')) $song_volume.removeClass('mute'); // toggle mute
    if (audio.volume <= 0 && !$song_volume.hasClass('mute')) $song_volume.addClass('mute');
  };

  this.collectKey = e => { // to detect keyboard shortcuts (key fired)
    if (!/input|textarea/i.test(e.target.tagName)) // ensure keystroke was not fired from an input field or textarea
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
    $tracker.removeClass('forward backward'); // remove fast forward/rewind flags
  };

  this.detectKey = e => { // to detect keyboard shortcuts (key press started)
    if (!/input|textarea/i.test(e.target.tagName)) // ensure keystroke was not fired from an input field or textarea
      switch (e.which) { // which key was pressed?
        case 37: // left arrow (try rewind)
          if (!$tracker.hasClass('backward')) this.press('backward', 1); // if not rewinding (no flag is set), try rewinding in 1% decrements
          break;
        case 39: // right arrow (try fast forward)
          if (!$tracker.hasClass('forward')) this.press('forward', 1); // if not fast forwarding (no flag is set), try fast forwarding in 1% increments
          break;
        default: break;
      }
  };

  this.getSongs = () => // to get songs and populate the song list
    findSongs().then(songs => { // retrieve songs using soundcloud api
      let songList = this.songList = List(songs); console.log(songList) // map songs to songList array
      bone.getRef('song-widget').place(<SongList songs={songList} />); // update the song widget with a list of song cards
      if ($audio_player.hasClass('error')){ // did the player break? (flag is set)
        $audio_player.removeClass('error'); this.play(); // remove error flag and play song
      } else $audio_player.find('.mini.title span').html(`<b style="font-size: 0.525em">songs loaded! ${ touch ? 'tap' : 'click' } triangle to play :-)</b>`); // update view if songs loaded
    }).catch(e => $audio_player.find('.mini.title span').html('<b style="font-size: 0.525em">error loading songs. :(</b>')); // update view if error loading songs

  this.init = () => { // to initialise the audio player
    $audio_player.find('.tracker:not(.read-only) .progresscircle').knob({ // initialise trackable progress circle
      // options
        "width": size, "height": size, // size based on window width
        "displayInput": false, "displayPrevious": true,
        "fgColor": "#FFF28C", "bgColor": "rgba(255,255,255,0.25)",
        "lineCap": "round",
        "step": 0.5, "angleOffset": 180, "thickness": 0.05,
        'change': value => { // when circle value is changed (manual tracking)
          if (Number(value)) audio.currentTime = Math.round(audio.duration * value / 100); // update time according to given numeric value (%)
        },
        'release': value => { // when circle is released (on scroll)
          if ($tracker.hasClass('tracking')) { // circle is being tracked manually (flag is set)
            $tracker.removeClass('tracking') // remove manual tracking flag
              .find('.progresscircle').trigger('configure', { "fgColor":"#FFF28C" }); // reset circle to primary colour
          } else if ($tracker.hasClass('scrolling') && Number(value)) // circle is being scrolled (flag is set), value is numeric
            audio.currentTime = Math.round(audio.duration * value / 100); // update time according to value given (%)
        }
    });
    $audio_player.find('.tracker.read-only .progresscircle').knob({ // initialise read only progress circle
      //options
        "width": size, "height": size, // size based on window width
        "displayInput": false, "readOnly": true,
        "fgColor": "#FFF28C", "bgColor": "rgba(255,255,255,0.25)",
        "lineCap": "round",
        "angleOffset": 180, "thickness": 0.05
    });
    this.getSongs(); // retrieve songs to play
  };

  this.mute = () => { // to mute/unmute the audio player
    if ($audio_player.find('.volume').hasClass('mute')) // is volume muted? (flag is set)
      audio.volume = this.lastVolumeValue; // unmute volume
    else { // volume is not muted
      this.lastVolumeValue = audio.volume; // record current volume
      audio.volume = 0; // mute volume
    }
    $audio_player.find('.volume').toggleClass('mute') // toggle the mute flag (set or remove)
  };

  this.pause = () => { // to pause the audio player
    this.lastTrackedValue = $audio_player.find('.tracker:not(.read-only) input').val() // record value of time tracker
    $audio_player.removeClass('playing'); // indicate a paused audio player (remove flag)
    $('.logo-mono').removeClass('hidden'); // reveal the big logo
     // shrinking animation for the music icon
    $('.logo-icon').css({ "transform" : "scale(.5)", "z-index" : -1 }).stop(true, false).animate({ "bottom" : "14%", "opacity" : 0.725 }, 400, "linear", function() {
      $(this).css("transform", "scale(1)").animate({ "bottom" : "20%", "opacity" : 1, "z-index" : 1 }, 950) });
    $('.tracker.read-only .progresscircle').val(this.lastTrackedValue).trigger('change'); // set the value of read only time tracker
    audio.pause(); // pause song
  };

  this.play = song => { // to play the audio player
    let songFound = !!( // return a boolean as to whether or not there is a song to play
      song = song && song.stream ? song // if 'song' is defined, use the given song if it has a stream link
      : this.songList.length ? // otherwise, are there songs in the song list?
        this.songList[this.nowPlaying] // if so, use the currently playing song
        : 0); // otherwise, use '0' (no song found)

    if (songFound){ // ensure there is a song to be played (streamed)
      if (!audio.src.includes(song.stream)) // if current song does not match the song to play
        audio.src = `${song.stream}?client_id=${ID}`; // set the song to play
      $audio_player.find('.title span').attr("title", song.title).text(song.title); // update view of song title
      if ($audio_player.hasClass('playing')){ // if audio player is playing (flag is set)
         // bouncing animation for the music icon
        $('.logo-icon').stop(true, false).animate({ "bottom" : "34.5%" }, 250, function() {
          $(this).animate({ "bottom" : "20%" }, 750) });
      } else { // audio player is paused (not playing)
         // jumping animation for the music icon
        $('.logo-icon').delay(345).animate({ "bottom" : "64.5%" }, 500, function() {
          $(this).animate({ "bottom" : "20%" }, 1250) });
        $audio_player.addClass('playing'); // indicate a playing audio player (set flag)
        $('.logo-mono').addClass('hidden'); // hide the big logo
      }
      audio.play(); // play song
    } else { // no song found
      $audio_player.addClass('error'); // indicate a broken audio player (set flag)
      this.getSongs(); // try to load songs
    }
  };

  this.playOrPause = () => { // to play/pause the audio player
    if ($audio_player.hasClass('playing')){ // if audio player is playing (flag is set)
      $audio_player.find('.playpause').attr("title", 'Play Track').find('a').html('Play'); // update DOM
      this.pause(); // pause song
    } else {
      $audio_player.find('.playpause').attr("title", 'Pause Track').find('a').html('Pause'); // update DOM
      this.play(); // play song
    }
  };

  this.press = (control, percentage) => { // to start fast forward or rewind (by the given percentage) when respective control is pressed and held
    if (this.tracking) clearTimeout(this.tracking); // clear fast forward or rewind timeout
    this.tracking = setTimeout(()=>{ // set/reset timeout to begin fast forward/rewind
        $tracker.addClass(control); // indicate a stepping progress circle (set flag: forward or backward)
        this.step( // fast forward or rewind in increments of the given percentage
          Math.abs(percentage) // ensure percentage is a positive number
          *(control === 'forward' ? 1 : -1)); // then specify the direction based on which control was pressed
        this.tracking = null; // nullify timeout
    }, 450); // starts stepping when pressed for 450ms
  };

  this.recur = () => { // to go to the previous song
    if ($tracker.hasClass('backward') === false) { // if player is not rewinding (no flag is set)
      if (this.tracking) clearTimeout(this.tracking); // clear rewinding timeout before flag is set
      if (audio.currentTime > 3.5) // if song has been playing for more than three and a half seconds
        audio.currentTime = 0; // just rewind song to the beginning (assume user wants to replay song)
      else { // assume user intends to go to the previous song
        this.nowPlaying--; // decrement now playing index designates previous song
        if (this.nowPlaying < 0) this.nowPlaying = this.songList.length - 1; // go to end of song list if at beginning
        this.play(this.songList[this.nowPlaying]); // play previous song
      }
    } else this.continue(); // stop rewinding
  };

  this.scroll = () => { // to scroll the progress circle
    if (!$tracker.hasClass('scrolling')) $('.tracker:not(.read-only)').addClass('scrolling'); // indicate scrolling on progress circle (set flag)
    if (this.scrolling) clearTimeout(this.scrolling); // clear timeout to remove scrolling flag
    this.scrolling = setTimeout(() => { // set/reset timeout to remove scrolling flag
        $tracker.removeClass('scrolling'); // indicate progress circle no longer scrolling (remove flag)
        this.scrolling = null; // nullify timeout
    }, 500); // remove flag if scrolling hasn't fired again after half a second
  };

  this.setupSong = ()=> { // to update player volume and song duration once song loads
    $song_duration.text(this.echoTime(audio.duration)); // update the duration of the current song
    $scrubber.find('div').height(audio.volume * 100 + '%'); // update view with current song volume
    this.lastVolumeValue = audio.volume; // use the current volume as the unmute volume
  };

  this.skip = () => { // to go to the next song
    if ($tracker.hasClass('forward') === false) { // if player is not fast forwarding (no flag is set)
      if (this.tracking) clearTimeout(this.tracking); // clear fast forwarding timeout before flag is set
      this.nowPlaying++; // increment now playing index designates next song
      if (this.nowPlaying >= this.songList.length) this.nowPlaying = 0; // start over if at the end of song list
      this.play(this.songList[this.nowPlaying]); // play next song
    } else this.continue(); // stop fast forwarding
  };

  this.step = direction => { // to 'step' the track in a given direction (fast forward, rewind). goes nowhere if no direction is given or is NaN
    let d = direction || 0, step = audio.duration * d / 100; // the amount to step is 'd' percent of the audio duration where 'd' is the amount given by 'direction'.
    if (step) this.stepping = setInterval(()=>{ Math.round(audio.currentTime += step); }, 100); // step the current time in the given direction
  };

  this.track = () => { // to track the progress circle
    $audio_player.find('.tracker:not(.read-only)').addClass('tracking'); // indicate manual tracking on progress circle (set flag)
    $audio_player.find('.tracker:not(.read-only) .progresscircle').trigger('configure', { "fgColor":"#d05000" }); // change color of progress circle to dark orange
  };

  this.updateTime = () => { // to update the time tracker on the fly as long as there is no user input
    let percentPlayed = (audio.currentTime / audio.duration) * 100; // calculate percent of song played based on current time and song duration
    if ($tracker.hasClass('scrolling') === false && $tracker.hasClass('tracking') === false) // if user is not scrolling or tracking the time knob (no flag is set)
      $tracker.find('.progresscircle').val(percentPlayed).trigger('change'); // set the value of the time knob based on percent played
    // if ($progress_bar.hasClass('tracking') === false) // if user is not tracking the progress bar (no flag is set)
      $audio_player.find('.played').width(percentPlayed + '%'); // update the width of the progress bar based on percent played
    $current_time.text(this.echoTime(audio.currentTime, audio.duration)); // update the current time
  }
},

List = songs => { // sets up the song list using data from soundcloud api
  return songs.map(song => { // remake song array to mirror db models
    return { // replace each object in the 'songs' array with this new object
      title: song.title, 
      duration: AudioPlayer.prototype.echoTime(song.duration / 1000),
      artwork: song.artwork_url || song.user.avatar_url,
      genre: song.genre,
      format: song.original_format,
      stream: song.stream_url,
      link: song.permalink_url
    };
  });
};

AudioPlayer.prototype.echoTime = (secs, duration) => { // to get a time string based on the given seconds and duration
  let hours = Math.floor(secs / 3600), // how many hours do the seconds make up?
      minutes = Math.floor(secs % 3600 / 60), // how many minutes do the seconds make up?
      seconds = Math.ceil(secs % 3600 % 60); // get the exact second, rounding up decimals
  return ( // return a string of the formatted time
    hours === 0 ? // if the seconds don't make up an hour or more
      (minutes === 60) // if the minutes are up to 60
      || (seconds === 60 && minutes === 59) ? // or the seconds are up to 60 while minutes are still floored to 59
        '01:' : // create the hours field displaying the first hour
      duration >= 3600 ? '00:' : // create the hours field void if duration is over an hour
      '' : // don't create the hours field if duration is under an hour 
    hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : // create the hours field; add a '0' before the hour if under 10 hours
    hours + ':' // create the hours field based on the number of hours
  ) + (
    seconds === 60 && minutes === 0 ? '01' : // if the seconds are up to 60 while minutes are still floored to 0, create the minutes field displaying the first minute        
      minutes.toString().length < 2 ? '0' + minutes : // if under 10 minutes, add a '0' before the minute and create the minutes field
        minutes === 60 // if the minutes are up to 60
        || (seconds === 60 && minutes === 59) ? // or if the seconds are up to 60 while minutes are still floored to 59
          '00' : // create the minutes field displaying '00' instead of '60' or '59'
        minutes // create the minutes field based on the number of minutes
  ) + ':' + ( // add mandatory colon
    seconds.toString().length < 2 ? '0' + seconds : // create the seconds field; add a '0' before the second if under 10 seconds
      seconds === 60 ? '00' : // if the seconds are up to 60, create seconds field displaying '00' instead of '60'
      seconds // create the seconds field
  );
};

// construct and export little bone
const bone = new Backbone();
export default bone;