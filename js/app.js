const API_KEY = 'a0bf12995e58cf3d1c78b67806ca1924';
const fetchData = position => {
  const { latitude, longitude } = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
}

const translateDescription = description => {
  const translations = {
    Clear: 'Despejado',
    Clouds: 'Nublado',
    Rain: 'Lluvia',
    Drizzle: 'Llovizna',
    Thunderstorm: 'Tormenta',
    Snow: 'Nieve',
    Mist: 'Neblina',
    Smoke: 'Humo',
    Haze: 'Calina',
    Dust: 'Polvo',
    Fog: 'Niebla',
    Sand: 'Arena',
    Ash: 'Ceniza',
    Squall: 'Chubasco',
    Tornado: 'Tornado'
  };
  return translations[description] || description;
}

const setWeatherData = data => {
  console.log(data);
  const weatherData = {
    location: data.name,
    description: translateDescription(data.weather[0].main),
    humidity: data.main.humidity + '%',
    pressure: data.main.pressure + ' hPa',
    temperature: data.main.temp + ' °C',
    date: getDate()
  };

  Object.keys(weatherData).forEach(key => {
    document.getElementById(key).textContent = weatherData[key];
  });

  cleanUp();
}

const cleanUp = () => {
  let container = document.getElementById('container');
  let loader = document.getElementById('loader');
  let logo = document.getElementById('logo');

  logo.style.display = 'flex';
  loader.style.display = 'none';
  container.style.display = 'flex';
}

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
}