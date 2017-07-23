import $ from 'jquery';
import React, { Component } from 'react';
import './App.css';

import { AudioPlayer } from './modules/backbone'
import './modules/knob';

let touch = 'ontouchstart' in window; // detect touchable document

class App extends Component {
  componentDidMount() {
    let player = new AudioPlayer(), // audio player object
        run = () => { // init function
          let audio = $('audio')[0]; // audio element
          player.getSongs(); // retrieve songs to play (uses soundcloud api)
          $('.tracker:not(.read-only) .progresscircle').knob({ // initialize trackable progress circle
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
          $('.tracker.read-only .progresscircle').knob({ // initialize read only progress circle
            //options
              "width": size, "height": size, // size based on window width
              "displayInput": false, "readOnly": true,
              "fgColor": "#FFF28C", "bgColor": "rgba(255,255,255,0.25)",
              "lineCap": "round",
              "angleOffset": 180, "thickness": 0.05
          });
        }, scrolling = null, // to clear progress scrolling
        size = Math.round($(window).width() * 0.78); // calculate 78% of window width (for progress circle dimensions)        

    $(document) // register live events
      .on('click', '.audio-player .play', player.play) // when the play button is clicked, play
      .on('click', '.audio-player .pause', player.pause) // when the pause button is clicked, pause
      .on('click', '.audio-player .next', player.skip) // when the next button is clicked, skip forward
      .on('click', '.audio-player .prev', player.recur) // when the prev button is clicked, skip backward
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .next', () => { // when the next button is pressed and held, fast forward
        if (player.tracking) clearTimeout(player.tracking); // reset fast forward timeout
        player.tracking = setTimeout(()=>{ // set timeout to begin fast forward
            $('.tracker').addClass('forw'); // indicate a fast forwarding progress circle
            player.step(1); // fast forward in 1% increments
            player.tracking = null; // nullify timeout
        }, 450); // fast forward after 450ms
      })
      .on(touch ? 'touchstart' : 'mousedown', '.audio-player .prev', () => { // when the prev button is pressed
        if (player.tracking) clearTimeout(player.tracking); // reset rewind timeout
        player.tracking = setTimeout(() => { // set timeout to begin rewind
            $('.tracker').addClass('rew'); // indicate a rewinding progress circle
            player.step(-1); // rewind in 1% decrements
            player.tracking = null; // nullify timeout
        }, 450); // rewind after 450ms
      })
      .on(touch ? 'touchstart' : 'mousedown', '.tracker:not(.read-only) canvas', () => { // when the progress circle is pressed
        $('.tracker:not(.read-only)').addClass('tracking'); // indicate manual tracking on progress circle
        $('.tracker:not(.read-only) .progresscircle').trigger('configure', { "fgColor":"#d05000" }); // change color of progress circle to dark orange
      })
      .on('touchend', '.audio-player .prev, .audio-player .next', () => { clearTimeout(player.stepping); }) // stop fast forward/rewind on mobile
      .on('mousewheel DOMMouseScroll', '.tracker:not(.read-only) canvas', () => { // when progress circle is scrolled
        if (!$('.tracker').hasClass('scrolling')) $('.tracker:not(.read-only)').addClass('scrolling'); // indicate scrolling on progress circle
        if (scrolling) clearTimeout(scrolling); // reset timeout to clear scrolling flag
        scrolling = setTimeout(() => { // set timeout to clear scrolling flag
            $('.tracker').removeClass('scrolling'); // indicate progress circle no longer scrolling
            scrolling = null; // nullify timeout
        }, 500); // clear flag if scrolling hasn't fired again after 0.5 seconds
      })
      .on('submit', 'form', () => { return false; }) // do not refresh page on form submit
      .ready(run); // when the document is ready, init
    
    $(window).resize(() => { // when the window is resized
        $('.progresscircle').trigger('configure', { "width":size, "height":size, }); // set size of time tracker
    })
  }

  render() {
    return (
      <div className="App">
        <audio className="player"></audio>
        <div className="container">
          <div className="monolith"></div>
          <div className="major audio-player">
            <div className="tracker">
                <input className="progresscircle" />
            </div>
            <div className="tracker read-only">
                <input className="progresscircle"  />
            </div>
            <div className="prev control">
              <svg width="73px" height="81px" viewBox="0 0 73 81" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <path d="M51,43.8333333 L5.96946407,71.3519942 C2.6726201,73.3667322 0,71.8620903 0,67.9968325 L0,5.00316749 C0,1.13542488 2.66679179,-0.370293903 5.96946407,1.64800582 L51,29.1666667 L51,9.00348663 C51,6.79242202 52.7965212,5 54.9958262,5 L59.0041738,5 C61.2110077,5 63,6.79537646 63,9.00348663 L63,64.9965134 C63,67.207578 61.2034788,69 59.0041738,69 L54.9958262,69 C52.7889923,69 51,67.2046235 51,64.9965134 L51,43.8333333 Z" id="prev-track"></path>
                    <filter x="-6.2%" y="-3.8%" width="112.5%" height="110.3%" filterUnits="objectBoundingBox" id="filter-2">
                        <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="HD-Landscape" transform="translate(-391.000000, -309.000000)">
                        <g transform="translate(396.000000, 311.000000)">
                            <g id="Triangle-Copy-2" transform="translate(31.500000, 36.498978) scale(-1, 1) translate(-31.500000, -36.498978) ">
                                <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#prev-track"></use>
                                <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#prev-track"></use>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </div>
            <div className="play control">
              <svg width="122px" height="144px" viewBox="0 0 122 144" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <path d="M744.186338,266.205022 C751.263128,270.51007 751.262665,277.490212 744.186338,281.794978 L649.813662,339.205022 C642.736872,343.51007 637,340.27508 637,331.993513 L637,216.006487 C637,207.718633 642.737335,204.490212 649.813662,208.794978 L744.186338,266.205022 Z" id="play-triangle-large"></path>
                    <filter x="-6.2%" y="-3.8%" width="112.5%" height="110.3%" filterUnits="objectBoundingBox" id="filter-1">
                        <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-632.000000, -204.000000)">
                        <g id="Triangle">
                            <use fill="black" fillOpacity="1" filter="url(#filter-1)" xlinkHref="#play-triangle-large"></use>
                            <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#play-triangle-large"></use>
                        </g>
                    </g>
                </g>
              </svg>
            </div>
            <div className="pause control">
              <svg width="122px" height="144px" viewBox="0 0 95 144" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <path d="M641,214.491553 C641,210.354082 644.366293,207 648.5,207 L648.5,207 C652.642136,207 656,210.362584 656,214.491553 L656,333.508447 C656,337.645918 652.633707,341 648.5,341 L648.5,341 C644.357864,341 641,337.637416 641,333.508447 L641,214.491553 Z M711,214.491553 C711,210.354082 714.366293,207 718.5,207 L718.5,207 C722.642136,207 726,210.362584 726,214.491553 L726,333.508447 C726,337.645918 722.633707,341 718.5,341 L718.5,341 C714.357864,341 711,337.637416 711,333.508447 L711,214.491553 Z" id="path-1"></path>
                    <filter x="-8.8%" y="-4.1%" width="117.6%" height="111.2%" filterUnits="objectBoundingBox" id="filter-2">
                        <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="HD-Landscape" transform="translate(-636.000000, -204.000000)">
                        <g id="Rectangle-6">
                            <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                            <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
                        </g>
                    </g>
                </g>
              </svg>
            </div>
            <div className="next control">
              <svg width="73px" height="81px" viewBox="0 0 73 81" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <path d="M563,43.8333333 L517.969464,71.3519942 C514.67262,73.3667322 512,71.8620903 512,67.9968325 L512,5.00316749 C512,1.13542488 514.666792,-0.370293903 517.969464,1.64800582 L563,29.1666667 L563,9.00348663 C563,6.79242202 564.796521,5 566.995826,5 L571.004174,5 C573.211008,5 575,6.79537646 575,9.00348663 L575,64.9965134 C575,67.207578 573.203479,69 571.004174,69 L566.995826,69 C564.788992,69 563,67.2046235 563,64.9965134 L563,43.8333333 Z" id="next-track"></path>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-903.000000, -309.000000)">
                        <g transform="translate(396.000000, 311.000000)">
                            <g id="Triangle-Copy">
                                <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#next-track"></use>
                                <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#next-track"></use>
                            </g>
                        </g>
                    </g>
                </g>
              </svg>
            </div>
            <div className="current time">
                <span>--:--</span>
            </div>
            <div className="time duration">
                <span>--:--</span>
            </div>
             <div className="title mono"><marquee><span></span></marquee></div>
             <div className="title mini">Now playing: <span>loading songs...</span></div>
          </div>
          {/* <div className="search-form">
            <form action="#">
              <input className="search-field" placeholder="search for music..."></input>
            </form>
          </div> */}
          <div className="icon"></div>
        </div>
      </div>
    );
  }
}

export default App;
