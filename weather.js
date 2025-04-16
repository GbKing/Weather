const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
let currentTemp = null;
let isCelsius = true;

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    const errorElement = document.getElementById('error');
    const weatherContainer = document.getElementById('weatherContainer');
    
    if (!city) {
        errorElement.textContent = 'Please enter a city name';
        errorElement.style.display = 'block';
        weatherContainer.style.display = 'none';
        return;
    }

    try {
        // Check internet connection first
        if (!navigator.onLine) {
            throw new Error('No internet connection. Please check your network and try again.');
        }

        const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${config.apiKey}&units=metric`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeather(data);
            errorElement.style.display = 'none';
            weatherContainer.style.display = 'block';
        } else {
            // Handle specific API error codes
            switch (data.cod) {
                case '404':
                    throw new Error('City not found. Please check the spelling and try again.');
                case '401':
                    throw new Error('API key is invalid. Please contact support.');
                case '429':
                    throw new Error('Too many requests. Please try again later.');
                default:
                    throw new Error(data.message || 'Error fetching weather data');
            }
        }
    } catch (error) {
        console.error('Error details:', error);
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
        weatherContainer.style.display = 'none';
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name + ', ' + data.sys.country;
    currentTemp = data.main.temp;
    displayTemperature();
    
    // Calculate local time using timezone offset
    const utc = Date.now();
    const localOffset = new Date().getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const cityTime = new Date(utc + localOffset + (data.timezone * 1000));
    const timeString = cityTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('localTime').textContent = `Local Time: ${timeString}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
}

function displayTemperature() {
    const temp = isCelsius ? currentTemp : (currentTemp * 9/5) + 32;
    const unit = isCelsius ? '°C' : '°F';
    document.getElementById('temperature').textContent = `Temperature: ${Math.round(temp)}${unit}`;
    document.querySelector('.unit-toggle').textContent = `Switch to ${isCelsius ? '°F' : '°C'}`;
}

function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    if (currentTemp !== null) {
        displayTemperature();
    }
}