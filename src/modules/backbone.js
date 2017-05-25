import $ from 'jquery';
import ID from './cred';
let

AudioPlayer = {
  play: song => {
    let audio = $('audio');
    if (!audio[0].src.includes(song.stream))
      audio.attr("src", `${song.stream}?client_id=${ID}`);
    audio[0].play();
    $('.audio-player').addClass('playing');
    $('.monolith').addClass('hidden');
  },
  pause: () => {
    $('audio')[0].pause();
    $('.audio-player').removeClass('playing');
    $('.monolith').removeClass('hidden');
  }
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
