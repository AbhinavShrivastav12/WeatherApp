const apiKey = '0d2e9ebb9f69bf8bc8d54b81b334f65c'; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherResult = document.getElementById('weather-result');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

searchButton.addEventListener('click', () => {
  const cityName = cityInput.value.trim();

  if (!cityName) {
    showError('Please enter a city name.');
    return;
  }

  fetchWeather(cityName);
});

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log('Fetching weather for:', city);

  fetch(apiUrl)
    .then(response => {
      console.log('Response status:', response.status, response.statusText);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText} (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', data);
      displayWeather(data);
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      showError(error.message);
    });
}

function displayWeather(data) {
  weatherResult.style.display = 'block';
  errorMessage.textContent = '';
  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
  descriptionElement.textContent = `Description: ${data.weather[0].description}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function showError(message) {
  weatherResult.style.display = 'none';
  errorMessage.textContent = message;
}
