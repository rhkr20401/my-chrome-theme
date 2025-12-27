import{API_KEY} from './env.js';

// weather
const getCurrentWeather = (latitude,longitude)=>{
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  fetch(URL)
  .then((response) => response.json())
  .then((data)=>{
    console.log(data)
    const city = document.querySelector('.city');
    const weather = document.querySelector('.weather-text');
    const temp = document.querySelector('.temp');
    const icon = document.querySelector('.icon');

    const weatherMain = data.weather[0].main;

    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather.innerText = data.weather[0].main;
    temp.innerText = `${Math.floor(data.main.temp)}°`;
    city.innerText = data.name;
    const videoSrc = getWeatherVideo(weatherMain);
    setWeatherVideo(videoSrc);
  });
};

const getPosition = (position)=>{
  const {latitude, longitude} = position.coords;
  getCurrentWeather(latitude,longitude);
};

const errorHandler = (error)=>{
  const noti = document.querySelector('.noti');
  noti.style.display='block';
};

if("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(getPosition,errorHandler);
}else {
  console.log('geolocation IS NOT available');
}

//video(weather)
const videoWrap = document.getElementById('video-wrap');

function setWeatherVideo(src) {
  videoWrap.innerHTML = '';
  const video = document.createElement('video');
  video.src = src;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  videoWrap.appendChild(video);
}

function getWeatherVideo(weatherMain) {
  switch (weatherMain) {
    case 'Clear': return '/img/clear.mp4';
    case 'Clouds': return '/img/clouds.mp4';
    case 'Rain': return 'img/rain.mp4';
    case 'Drizzle': return 'img/drizzle.mp4'
    case 'Thunderstorm': return 'img/thunderstorm.mp4';
    case 'Snow': return 'img/snow.mp4';
    case 'Mist': return 'img/atmosphere.mp4';
    case 'Fog': return 'img/atmosphere.mp4';
  }
}