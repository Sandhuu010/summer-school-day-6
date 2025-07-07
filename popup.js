document.getElementById('getWeather').addEventListener('click', () => {
  const weatherInfo = document.getElementById('weatherInfo');
  const errorElement = document.getElementById('error');
  
  weatherInfo.classList.add('hidden');
  errorElement.classList.add('hidden');
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        showError('Error getting location: ' + error.message);
      }
    );
  } else {
    showError('Geolocation is not supported by this browser.');
  }
});

function fetchWeather(lat, lon) {
  const apiKey = 'c8172414995f2d78fdc55713b1f068f6';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      showError('Error fetching weather: ' + error.message);
    });
}

function displayWeather(data) {
  const cityElement = document.getElementById('city');
  const tempElement = document.getElementById('temperature');
  const conditionElement = document.getElementById('condition');
  const weatherInfo = document.getElementById('weatherInfo');
  
  cityElement.textContent = data.name;
  tempElement.textContent = `${Math.round(data.main.temp)}°C`;
  conditionElement.textContent = data.weather[0].description;
  
  weatherInfo.classList.remove('hidden');
}

function showError(message) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
}