import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');
const player = new Player(iframeRef);

const timeOfPause = localStorage.getItem('videoplayer-current-time');
const parsedTimeOfPause = JSON.parse(timeOfPause);

if (parsedTimeOfPause) {
  player.setCurrentTime(parsedTimeOfPause);
}

function handleTimeUpdate(event) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(event.seconds)
  );
}

player.on('timeupdate', throttle(handleTimeUpdate, 1000));

