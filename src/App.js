import $ from 'jquery';
import React, { Component } from 'react';
import './App.css';

import findSongs from './modules/soundcloud';
import { AudioPlayer, List } from './modules/backbone'
import './modules/knob';

class App extends Component {
  componentDidMount() {
    let player = new AudioPlayer(),
        run = () => {
          findSongs().then(songs => {player.songList = List(songs);console.log(player.songList)});
          let audio = $('audio')[0],
              size = Math.round($(window).width() * 0.78);
          $('.tracker:not(.read-only) .timeknob').knob({
              "width": size,
              "height": size,
              "displayInput": false,
              "displayPrevious": true,
              "bgColor": "rgba(255,255,255,0.25)",
              "fgColor": "#FFF28C",
              "lineCap": "round",
              "step": 0.5,
              "angleOffset":180,
              "thickness": "0.05",
              'change': value => {
                  audio.currentTime = Math.round(audio.duration * value / 100);
              },
              'release': value => {
                  if ($('.tracker').hasClass('tracking')) {
                    $('.tracker').removeClass('tracking');
                    $('.timeknob').trigger('configure', { "fgColor":"#FFF28C" });
                  } else if ($('.tracker').hasClass('scrolling')) {
                    audio.currentTime = Math.round(audio.duration * value / 100);
                  }
                }
          });
          $('.tracker.read-only .timeknob').knob({
              "width": size,
              "height": size,
              "displayInput": false,
              "bgColor": "rgba(255,255,255,0.25)",
              "fgColor": "#FFF28C",
              "lineCap": "round",
              "angleOffset":180,
              "readOnly": true,
              "thickness": "0.05"
          });
        };

    let scrolling = null;
    $(document)
      .on('click', '.audio-player .play', () => { player.play() })
      .on('click', '.audio-player .pause', player.pause)
      .on('click', '.audio-player .next', player.skip)
      .on('click', '.audio-player .prev', player.recur)
      .on('mousedown', '.audio-player .prev', () => {
        if (player.tracking) clearTimeout(player.tracking);
        player.tracking = setTimeout(() => {
            $('.tracker').addClass('rew');
            player.step(-1); // rewind in 1% decrements
            player.tracking = null;
        }, 450);
      })
      .on('mousedown', '.audio-player .next', () => {
        if (player.tracking) clearTimeout(player.tracking);
        player.tracking = setTimeout(()=>{
            $('.tracker').addClass('forw');
            player.step(1); // fast forward in 1% increments
            player.tracking = null;
        }, 450);
      })
      .on('mousedown', '.tracker:not(.read-only) canvas', () => {
          $('.tracker:not(.read-only)').addClass('tracking')
          $('.tracker:not(.read-only) .timeknob').trigger('configure', { "fgColor":"#d05000" });
      })
      .on('mousewheel DOMMouseScroll', '.tracker:not(.read-only) canvas', () => {
          $('.tracker:not(.read-only)').addClass('scrolling');
          if (scrolling) clearTimeout(scrolling);
          scrolling = setTimeout(() => { $('.tracker').removeClass('scrolling'); scrolling = null }, 500);
      })
      .on('submit', 'form', () => { return false; })
      .ready(run);
    
    $(window).resize(() => {
        let size = Math.round($(window).width() * 0.78)

        $('.timeknob').trigger(
            'configure', {
              "width": size,
              "height": size,
            }
        );
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
                <input className="timeknob" />
            </div>
            <div className="tracker read-only">
                <input className="timeknob"  />
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
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="HD-Landscape" transform="translate(-391.000000, -309.000000)">
                        <g id="Group-3" transform="translate(396.000000, 311.000000)">
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
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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
                        <g id="Group-3" transform="translate(396.000000, 311.000000)">
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
                <span></span>
            </div>
            <div className="time duration">
                <span></span>
            </div>
            {/* <div className="info">Now Playing: <a className="loading" rel="noopener noreferrer" target="_blank">loading tracks...</a></div> */}
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
