import $ from 'jquery';

let

AudioPlayer = {
  play: () => {
    $('.audio-player').addClass('playing');
    $('.monolith').addClass('hidden');
  },
  pause: () => {
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
