
import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const getOne = (lat, lon) => {
  const req = axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  return req.then(res => res.data);
}

const getImg = (icon) => {
  const req = axios.get(`https://openweathermap.org/img/wn/${icon}@2x.png`);
  return req.then(res => res.data);
}

export default { getOne, getImg }
